var map;
var formattedAddress;


function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(-37.911557,145.134011),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
   map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);

function addLocation() {
        			var geocoder = new google.maps.Geocoder();    // instantiate a geocoder object
			
			// Get the user's inputted address
			var address = document.getElementById( "address" ).value;
		  
			// Make asynchronous call to Google geocoding API
			geocoder.geocode( { 'address': address }, function(results, status) {
				var addr_type = results[0].types[0];	// type of address inputted that was geocoded
                formattedAddress = results[0].formatted_address
				if ( status == google.maps.GeocoderStatus.OK ){  
                    ShowLocation( results[0].geometry.location, address, addr_type );
                }
				else     {
					alert("Geocode was not successful for the following reason: " + status);    
                }
			});
		} ;

	// Show the location (address) on the map.
	function ShowLocation( latlng, address, addr_type )
	{
		// Center the map at the specified location
		map.setCenter( latlng );
		
		// Set the zoom level according to the address level of detail the user specified
		var zoom = 12;
		switch ( addr_type )
		{
		case "administrative_area_level_1"	: zoom = 6; break;		// user specified a state
		case "locality"						: zoom = 10; break;		// user specified a city/town
		case "street_address"				: zoom = 15; break;		// user specified a street address
		}
		map.setZoom( zoom );
        
		//Get the user's inputted nickname
        var nickname = document.getElementById("nickname").value;
        
		// Place a Google Marker at the same location as the map center 
		// When you hover over the marker, it will display the title
		var marker = new google.maps.Marker( { 
			position: latlng,     
			map: map,  
            title: address
		});
		
		// Create an InfoWindow for the marker
        if (nickname.length > 0) {
		      var contentString = "<b>" + nickname + "</b>";	// HTML text to display in the InfoWindo
        } else {
              var contentString = "<b>" + formattedAddress + "</b>";	// HTML text to display in the InfoWindow
        }
        var infowindow = new google.maps.InfoWindow( { content: contentString } );
        var lat = latlng.lat();
        var lng = latlng.lng()
        var locationCacheInstance = new LocationWeatherCache();
        locationCacheInstance.addLocation(lat, lng, nickname);
        
		
		// Set event to display the InfoWindow anchored to the marker when the marker is clicked.
		google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
	}


