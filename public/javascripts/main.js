(function() {

  window.APP = {
    residents: [],

    init: function() {
      this.getResidents();
      this.bindNavLinks();
      this.changePage('home');
    },

    bindNavLinks: function() {
      var navTo = this.changePage.bind(this);

      $('.nav-link.home')
        .click(function() { navTo('home'); });

      $('.nav-link.residents')
        .click(function() { navTo('residents'); });
    },

    changePage:function(name) {
      var cms = this.pageManager,
          updateBody = this._updateContent.bind(null, $('#dynamic-body')),
          initPage = this.initPage.bind(this, name),
          callback = function(data) {
            updateBody(data);
            initPage();
          };

      cms.loadPage(name, callback);
    },

    initPage: function(name) {
      var navTo = this.changePage.bind(this),
          newResidentHeaders = {
            type: 'POST',
            url: '/create-resident',
            data: {
              first_name: $('.fName').val(),
              last_name: $('.lName').val(),
              unit_number: $('.uNumber').val()
            }
          };

      if (name === 'residents') {
        $('.new-resident')
          .click(function() { navTo('new-resident'); });
      } else if (name === 'new-resident') {
        $('.button')
          .click(function(){ $.ajax(newResidentHeaders); });
      }
    },

    getResidents: function() {
      var addResident = this.residents.push.bind(this),
          Resident = this.Models.Resident,
          residentsCallback = function(data) {
            _.each(data.residents, function(resident) {
              addResident(new Resident(resident));
            });
          };

      $.ajax('/api/residents').then(residentsCallback);
    },

    _updateContent: function($el, html) {
      $el.html(html);
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();
