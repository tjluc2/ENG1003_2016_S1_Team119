// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var map
var selectedLocation = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"))
function initialize() {
    console.log(selectedLocation);

                
  var mapProp = {
    center:new google.maps.LatLng(selectedLocation.latitude,selectedLocation.longitude),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

    
   map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
      // Place a Google Marker at the same location as the map center 
                // When you hover over the marker, it will display the title
                var marker = new google.maps.Marker( { 
                    position: new google.maps.LatLng(selectedLocation.latitude,selectedLocation.longitude),
                    map: map,  
                    title: selectedLocation.nickname
                });
		     
		      // Create an InfoWindow for the marker
                    var contentString = "<b>" + selectedLocation.nickname + "</b>";	// HTML text to display in the InfoWindo
               
                var infowindow = new google.maps.InfoWindow( { content: contentString } );
		
                // Set event to display the InfoWindow anchored to the marker when the marker is clicked.
                google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
                // Set the zoom level according to the address level of detail the user specified
    
}

function removeLocation(){
    var locationCacheInstance = new LocationWeatherCache();
    locationCacheInstance.removeLocationAtIndex(selectedLocation);
}
function weatherForecastSlider(){
    $.ajax({
  url: "https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/" + selectedLocation.latitude + "," + selectedLocation.longitude + "," + sliderDate,
  jsonp: "callback",
  dataType: "jsonp",
  success: function(data) {
 var summary=data.currently.summary;
 var temperature=data.currently.temperature+"°C";
 var humidity=data.currently.humidity*100+"%";
 var windSpeed=(data.currently.windSpeed)*3.6+" km/h";
 document.getElementById("weatherText").value='Current Weather Condition:'+summary+' '+'Current temperature:'+temperature+' '+'Current humidity:'+humidity+' '+'Windspeed:'+windSpeed
 
 
    console.log(data.currently.summary); // look in the console to see the JSON
       
  }
});
    
}

