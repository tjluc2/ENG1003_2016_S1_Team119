var map;
var formattedAddress;
var tempResults;
var marker = new google.maps.Marker( {   //creates a marker outside of the geoLocate function to prevent duplicate markers.         
                });
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(-37.911557,145.134011),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
   map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);

function geoLocate() {
            var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
    
			var address = document.getElementById( "address" ).value; // Get the user's inputted address
		  
			// Make asynchronous call to Google geocoding API
            geocoder.geocode( { 'address': address }, function(results, status) {
				// type of address inputted that was geocoded
                // formattedAddress = results[0].formatted_address
        if ( status == google.maps.GeocoderStatus.OK){       
                map.setCenter(results[0].geometry.location);
                formattedAddress = results[0].formatted_address
                var addr_type = results[0].types[0];
                var nickname = document.getElementById("nickname").value;
        
                // Place a Google Marker at the same location as the map center 
                // When you hover over the marker, it will display the title
                    marker.setTitle(address)
                    marker.setMap(map)
                    marker.setPosition(results[0].geometry.location)    
         
		       tempResults = results
		      // Create an InfoWindow for the marker
                if (nickname.length > 0) {
                    var contentString = "<b>" + nickname + "</b>";	// HTML text to display in the InfoWindo
                } else {
                    var contentString = "<b>" + formattedAddress + "</b>";	// HTML text to display in the InfoWindow
                }
                var infowindow = new google.maps.InfoWindow( { content: contentString } );
		
                // Set event to display the InfoWindow anchored to the marker when the marker is clicked.
                google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
                // Set the zoom level according to the address level of detail the user specified
                var zoom = 12;
                switch ( addr_type )
                {
                    case "administrative_area_level_1"	: zoom = 6; break;		// user specified a state
		            case "locality"						: zoom = 10; break;		// user specified a city/town
                    case "street_address"				: zoom = 15; break;		// user specified a street address
                }
                map.setZoom( zoom );
                }
        else if (document.getElementById( "address" ).value != "" && status != "OVER_QUERY_LIMIT")    {
				alert("Geocode was not successful for the following reason: " + status);    
                document.getElementById( "address" ).value = "";
                
                    
                    }

			});
	
		} ;

function addToCache() {
    var lat = tempResults[0].geometry.location.lat();
    var lng = tempResults[0].geometry.location.lng();
    var nickname = document.getElementById("nickname").value;
    var formattedAddress = tempResults[0].formatted_address
    if (nickname == "") {
        nickname = formattedAddress;
    }
    var locationCacheInstance = new LocationWeatherCache();
    locationCacheInstance.addLocation(lat, lng, nickname);
    
    
}
