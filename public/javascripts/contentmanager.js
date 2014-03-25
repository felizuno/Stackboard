(function() {
  var APP = window.APP || {};

  APP.contentManager = {
    $dynamicBody: false,

    init: function() {
      this.$dynamicBody = $('#dynamic-body');
    },

    loadPage: function(pageName) {
      $.ajax('/' + pageName).then(this.updateBody);
    },

    updateBody: function(html) {
      $('#dynamic-body').html(html);
    }
  };

  $('document').ready(function(){ 
    APP.contentManager.init();
  });
})();
