(function() {

  var APP = window.APP || {};

  APP.pageManager = {
    pageCache: {},

    loadPage: function(pageName, callback, force) {
      var self = this;

      if (this.pageCache[pageName] && !force) {
        callback(this.pageCache[pageName].pageData);
      } else {
        $.ajax('/' + pageName).then(function(data) {
          // self._cachePage(pageName, data);
          callback(data);
        });
      }
    },

    _cachePage: function(pageName, pageHtml) {
      this.pageCache[pageName] = {
        name: pageName,
        pageData: pageHtml,
        freshDate: Date.now()
      };
    }
  };

})();
