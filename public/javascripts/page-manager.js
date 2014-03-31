(function() {

  var APP = window.APP || {};

  APP.pageManager = {
    pageCache: {},

    changePage:function(name) {
      var updateBody = this._updateContent.bind(null, $('#dynamic-body')),
          initPage = this.initPage.bind(this, name),
          callback = function(data) {
            updateBody(data);
            initPage();
          };

      this.loadPage(name, callback);
    },

    initPage: function(name) {
      var navTo = this.changePage.bind(this),
          $resList = $('.residents-list');

      if (name === 'residents') {
        APP.residents.each(function(resident) {
          $resList.append(resident.template('<li>'));
        });

        $('.new-resident')
          .click(function() { navTo('new-resident'); });

        $('.resident .remove').click(function(){
          APP.removeResident($(this).attr('data-id'));
        });
      } else if (name === 'new-resident') {
        $('.button')
          .click(function(){
            // TODO : LINK UP APP.addResident
            APP.addResident({
              first_name: $('.fName').val(),
              last_name: $('.lName').val(),
              unit_number: $('.uNumber').val()
            });
          });
      }
    },

    _updateContent: function($el, html) {
      $el.html(html);
    },

    loadPage: function(pageName, callback, force) {
      var cache = this._cachePage.bind(this, pageName);

      if (this.pageCache[pageName] && !force) {
        callback(this.pageCache[pageName].pageData);
      } else {
        $.ajax('/' + pageName).then(function(data) {
          cache(data); // TODO: disabled until cachebusting implemented
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
