(function() {
  var APP = window.APP || {};

  APP.Resident = Backbone.Model.extend({
    idAttribute: '_id',
    initialize: function() {
      this.set('fullName', this.get('firstName') + ' ' + this.get('lastName'));
      this.party();
    },
    party: function() {
      console.log('WOO PARTY', this.get('fullName'));
    },
    template: function(type, contentKeys, classArray) {
      contentKeys = contentKeys || ['fullName', 'unit'];
      classArray = classArray || ['resident'];
      
      var html = {
            fullName: '<span class="full-name">' + this.get('fullName') + '</span>',
            unit:'<span class="unit"> - unit ' + this.get('unit') + '</span>'
          },
          iterator = function(carry, key) {
            return carry += (html[key]) ? html[key] : '';
          },
          content = _.reduce(contentKeys, iterator, '');

      return $(type)
        .addClass(classArray.join(' '))
        .html(content);
    }
  });

  APP.Residents = Backbone.Collection.extend({
    model: APP.Resident,

    getResidents: function() {
      var addResident = this.add.bind(this),
          addResidents = function(data) { _.each(data.residents, addResident); };

      $.ajax('/api/residents').then(addResidents);
    }
  });

})();
