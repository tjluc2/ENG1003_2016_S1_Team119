// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var map
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(-37.911557,145.134011),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
   map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

