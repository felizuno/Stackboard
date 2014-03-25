(function() {
  var APP = window.APP || {};

  APP.contentManager = {
    loadPage: function(pageName, callback) {
      $.ajax('/' + pageName).then(callback);
    },
  };

})();
