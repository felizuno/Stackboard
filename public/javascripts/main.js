(function() {
  window.APP = {
    init: function() {
      this.bindNavLinks();
    },

    bindNavLinks: function() {
      var self = this,
          cms = this.contentManager,
          updateBody = this.updateContent.bind(null, $('#dynamic-body'));

      $('.nav-link.home')
        .click(function(e) {
          e.preventDefault();
          cms.loadPage('home', updateBody);
        });

      $('.nav-link.residents')
        .click(function(e) {
          e.preventDefault();
          cms.loadPage('residents', updateBody);
        });
    },

    updateContent: function($el, html) {
      $el.html(html);
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();