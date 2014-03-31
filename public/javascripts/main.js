(function() {

  window.APP = {
    init: function() {
      this.residents = new this.Residents();
      this.residents.getResidents();
      this.bindNavLinks();
      this.pageManager.changePage('home');
    },

    bindNavLinks: function() {
      var navTo = this.pageManager.changePage.bind(this.pageManager);

      $('.nav-link.home')
        .click(function() { navTo('home'); });

      $('.nav-link.residents')
        .click(function() { navTo('residents'); });
    },

    addResident: function(config) {
      var self = this;
      var navTo = this.pageManager.changePage.bind(this.pageManager);

      $.ajax({ type: 'POST', url: '/create-resident', data: config })
        .then(function(response) {
          if (response.success && response.resident) {
            self.residents.add(response.resident);
            navTo('residents');
          }
        });
    },

    removeResident: function(id) {
      var self = this;
      var navTo = this.pageManager.changePage.bind(this.pageManager),
          local = this.residents.where({ _id: id });

      $.ajax({ type: 'POST', url: '/delete-resident', data: { id: id } })
        .then(function(response) { 
          if (response.success) self.residents.remove(local);
          navTo('residents');
        });
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();
