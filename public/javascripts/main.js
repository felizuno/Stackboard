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
          self.contentManager.loadPage('home');
        });

      $('.nav-link.residents')
        .click(function(e) {
          e.preventDefault();
          self.contentManager.loadPage('residents');
        });
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();