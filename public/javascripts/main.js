(function() {
  window.APP = {
    init: function() {
      this.bindNavLinks();
    },

    bindNavLinks: function() {
      var self = this;

      $('.nav-link.home')
        .click(function(e) {
          e.preventDefault();
          self.contentManager.loadPage('home', self.updateBody);
        });

      $('.nav-link.residents')
        .click(function(e) {
          e.preventDefault();
          self.contentManager.loadPage('residents', self.updateBody);
        });
    },

    updateBody: function(html) {
      $('#dynamic-body').html(html);
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();