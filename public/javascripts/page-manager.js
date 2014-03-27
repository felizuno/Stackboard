(function() {

  var APP = window.APP || {};

  APP.pageManager = {
    pageCache: {},

    loadPage: function(pageName, callback, force) {
      var cache = this._cachePage.bind(this, pageName);

      if (this.pageCache[pageName] && !force) {
        callback(this.pageCache[pageName].pageData);
      } else {
        $.ajax('/' + pageName).then(function(data) {
          // cache(data);
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
