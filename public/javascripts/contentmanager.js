(function() {

  var APP = window.APP || {};

  APP.contentManager = {
    pageCache: {},

    loadPage: function(pageName, callback, force) {
      var self = this;

      if (this.pageCache[pageName] && !force) {
        callback(this.pageCache[pageName].page);
      } else {
        $.ajax('/' + pageName).then(function(data) {
          self.cachePage(pageName, data);
          callback(data);
        });
      }
    },

    cachePage: function(pageName, pageHtml) {
      this.pageCache[pageName] = {
        page: pageHtml,
        freshDate: Date.now()
      };
    }
  };

})();
