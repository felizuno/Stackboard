(function() {
  var APP = window.APP || {};

  APP.contentManager = {
    pageCache: {},
    loadPage: function(pageName, callback) {
      var self = this;

      if (this.pageCache[pageName]) {
        callback(this.pageCache[pageName].page);
      } else {
        $.ajax('/' + pageName).then(function(data) {
          self.addPageToCache(pageName, data);
          callback(data);
        });
      }
    },

    addPageToCache: function(pageName, data) {
      this.pageCache[pageName] = {
        page: data,
        freshDate: Date.now()
      };
    }
  };

})();
