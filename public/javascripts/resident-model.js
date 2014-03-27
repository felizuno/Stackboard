(function() {
  var APP = window.APP || {};
  APP.Models = APP.Models || {};

  APP.Models.Resident = Backbone.Model.extend({
    initialize: function() {
      this.set('fullName', this.get('firstName') + ' ' + this.get('lastName'));
      this.party();
    },
    party: function() {
      console.log('WOO PARTY', this.get('fullName'));
    },
    template: function(type, classArray) {
      classArray = classArray || [];
      
      if (type === '<li>') {
        return $('<li>')
          .addClass(classArray.join(' '))
          .text(this.get('fullName'));
      }
    }
  });

})();
