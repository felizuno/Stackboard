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

      return $(type)
        .addClass(classArray.join(' '))
        .text(this.get('fullName') + ' - unit ' + this.get('unit'));
    }
  });

  APP.Residents = Backbone.Collection.extend({
    model: APP.Resident,

    getResidents: function() {
      var addResident = this.add.bind(this),
          residentsCallback = function(data) {
            _.each(data.residents, addResident);
          };

      $.ajax('/api/residents').then(residentsCallback);
    }
  });

})();
