var togglePanel = function () {
  var e = $('#register');
  
  if ( e.hasClass("off" )) {
    e.addClass("on").removeClass("off");
  
  } else if ( e.hasClass("on") ) {
    e.addClass("off").removeClass("on");
  } else {
    e.addClass("on");
  }
}
var shows = $('[data-toggle="drawer"]');

shows.on('click', function() {
  togglePanel();
});