// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var map
var selectedLocation = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"))
var currentLocationObject = {}; //An object that will contain currentLocation infromation.
function init(){ //intialises the map.
     var mapProp = { //defines where the map will be centered and the zoom level
    center:new google.maps.LatLng(selectedLocation.latitude,selectedLocation.longitude),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
      
  }; 
   map=new google.maps.Map(document.getElementById("googleMap"),mapProp); //creates the map with mapProp parameters

      
}

/*
 * This function is called when the slider has stopped moving.
 * Function: weatherForecastSlider()
 * Authors: Luke Waldren, Raymond Fu, Taylah Lucas, Abe Lawson.
 * Since: 24/5/2016
 * Modified: 29/05/2016
 * Param list: 
 * Return list: 
 * Description: This function sends a HTTP request through the Dark Sky forecast api in order to get information relevant to a location and time.
 * Pre-condition: must have a valid API key, longitude, latitude and date (in the correct format). Must also have a working internet connection.
 * Post-condition: none.
 *
 * Input : latitude, longitude, sliderDate (date)
 * Output: weather summary, max temp, min temp, humidity, wind speed.
 */
function weatherForecastSlider(){ //Creates the weather forecast for the slider, was unable to use locationCache functions as these values will not be stored!
    
$.ajax({ //an AJAX request allows us to communicate with the forecast.io server and exchange data.
  //This url contains our API key as well as a longitude latitude and data (which was obtained through the slider value).
  url: "https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/" + selectedLocation.latitude + "," + selectedLocation.longitude + "," + sliderDate + "?callback=?&units=si",
  jsonp: "callback",
  dataType: "jsonp",
  success: function(data) { //The values below are all obtained through the response of the forecast.io server.
      var summary= data.daily.data[0].summary
      var maxTemp = "Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C"
      var minTemp = "Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C"
      var humidity= "Humidity: " + Math.round(data.daily.data[0].humidity *100) + "%"
      var windSpeed= "Wind speed: " + Math.round(data.daily.data[0].windSpeed *3.6) + "km/h"
      //Set the value of the textArea to contain all the weather values.
      document.getElementById("weatherText").value= summary + "\n" +  maxTemp + "          " + minTemp + "\n" + humidity + "   " + windSpeed       
  }
});
}

/*
 * This function is called every 500ms.
 * Function: getLocation()
 * Authors: Luke Waldren, Raymond Fu, Taylah Lucas, Abe Lawson.
 * Since: 22/5/2016
 * Modified: 29/05/2016
 * Param list: position
 * Return list: 
 * Description: This function will get the current position of the device everytime it is called and set the map to that location with an infowindow
 * and accuracy circle.
 * Pre-condition: Must have geocoding. Must have google chrome. Requires internet connection. Device must have GPS.
 * Post-condition: none.
 *
 * Input : 
 * Output: accuracy circle, position.
 */
setInterval(getLocation,500) //run the getLocation command frequently to identify changes in location.
function getLocation() {
    if (navigator.geolocation) { 
         navigator.geolocation.watchPosition(showPosition); //watches for changes in lat and lng.
    } 
    else {
    }
}
function showPosition(position) { //If there has been a change the map will update to refelct the new location of the user.
    if(currentLocationObject.latitude == position.coords.latitude && currentLocationObject.longitude == position.coords.longitude){
        console.log("will do nothing")
    }
    else{
        //creates an infoWindow on the current position.
		  var infoWindow = new google.maps.InfoWindow({map: map});
		  var pos = { //create latlng for current position
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos); //set infowindow to current positon.
            infoWindow.setContent('Your Location.'); //Label for the infoWindow.
            var circle = new google.maps.Circle({ //create a circle indicating the accuracy of the current location.
                center: pos,
                radius: position.coords.accuracy, //define the radius of the circle to be the accuracy obtained.
                map: map,
                strokeColor: 'blue', //make the circle pretty and blue.
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'blue',
                fillOpacity: 0.35,
            });
            currentLocationObject = { //create an object to contain the new location values obtained.
                latitude:  position.coords.latitude,
                longitude:  position.coords.longitude,
            }
            localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(currentLocationObject)); //push the values into selectedLocation.
            selectedLocation = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"))
            weatherForecastSlider() //set the current weather to the new location
    }
}