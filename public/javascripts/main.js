(function() {
  window.APP = {
    init: function() {
      // alert('foo');
      $.ajax('/residents').then(function(data) {
        debugger;
        $('#dynamic-body').html(data);
      });
    }
  };

  $('document').ready(function() {
    APP.init();
  });

})();