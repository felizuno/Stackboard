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
    template: function(type, classArray) {
      classArray = classArray || ['resident'];

      if (type === '<li>') {
        return $('<li>')
          .addClass(classArray.join(' '))
          .text(this.get('fullName') + ' - unit ' + this.get('unit'));
      }
    }
  });

  APP.Residents = Backbone.Collection.extend({
    model: APP.Resident,

    getResidents: function() {
      var residentsCallback = function(data) {
        _.each(data.residents, APP.residents.add.bind(APP.residents));
      };

      $.ajax('/api/residents').then(residentsCallback);
    }
  });

})();
