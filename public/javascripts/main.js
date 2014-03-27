(function() {

  window.APP = {
    residents: [],

    init: function() {      
      var self = this,
          residentsCallback = function(data) {
            _.each(data.residents, function(resident, i) {
              self.residents.push(new self.Models.Resident(resident));
            });
            console.log('PARTIERS ARE', self.residents);
          };

      this.bindNavLinks();
      this.changePage('home');
      $.ajax('/api/residents').then(residentsCallback);
    },

    bindNavLinks: function() {
      var self = this;

      $('.nav-link.home')
        .click(function(e) {
          e.preventDefault();
          self.changePage('home');
        });

      $('.nav-link.residents')
        .click(function(e) {
          e.preventDefault();
          self.changePage('residents');
        });
    },

    changePage:function(name) {
      var cms = this.pageManager,
          updateBody = this._updateContent.bind(null, $('#dynamic-body')),
          initPage = this.initPage.bind(this, name),
          callback = function(data) {
            updateBody(data);
            initPage(name);
          };

      cms.loadPage(name, callback);
    },

    initPage: function(name) {
      var self = this;

      if (name === 'residents') {
        $('.new-resident')
          .click(function(e) {
            e.preventDefault();
            self.changePage('new-resident');
          });
      } else if (name === 'new-resident') {
        $('.button')
          .click(function(e){
            e.preventDefault();
            console.log('CLICKS YO!');
            $.ajax({
              type: 'POST',
              url: '/create-resident',
              data: {
                first_name: $('.fName').val(),
                last_name: $('.lName').val(),
                unit_number: $('.uNumber').val()
              }
            });
          });
      }
    },

    _updateContent: function($el, html) {
      $el.html(html);
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();
