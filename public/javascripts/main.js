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
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();
