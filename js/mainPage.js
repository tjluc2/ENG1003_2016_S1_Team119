// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

//var tempLocation = JSON.parse(localStorage.getItem(APP_PREFIX))
//var locationName = tempLocation[0]
//localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(locationName));
 

function viewLocation(clicked_id)
{
    selectedIndex = clicked_id
    //Turns location back into object

  var selectedLocation =  temp[selectedIndex]
   localStorage.setItem(APP_PREFIX + "-index", selectedIndex);
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(temp[selectedIndex]));

   
    // And load the view location page.
     location.href = 'viewlocation.html';
}


function weatherForecastSummary(){ //adds weather summary using forecast io api.

            var apiKey = 'cc76775d3f3464a6c4a3f856e0b11b05';
            var url = 'https://api.forecast.io/forecast/';
            var lati = temp[i].latitude;
            var longi = temp[i].longitude;
            var data;
//converts the data using json and grabs the temperature and weather summary.
            $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?&units=si", function(data) {
            temperature =" Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C"
            icon = data.currently.icon
            summary =  '<img  class="mdl-list__item-icon" src="images/' + icon + '.png"></img>' + data.currently.summary  +    temperature ;
            updateSummary(temp) //adds 
            console.log(data.daily.summary)
            return summary
            });
}
t=0 //couldnt use i again.
function updateSummary(){ // modifies the html of each list elements using their ID which is their index in the local storage. Summary no longer is "loading..." but is now the weather summary
listHTML = document.createElement("li")     
document.getElementById(t).innerHTML = '<li id =' + t + ' ' + 'class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(this.id, temp);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + temp[t].nickname + '</span> <span id="weather0" class="mdl-list__item-sub-title" >' + summary + '</span></span></li>';
      document.getElementById('locationList').appendChild(listHTML);
    t++
}

function geoFindMe() { //using geocoder grabs the current position, and creates the variable currentLocation which is the formatted address from the gecoder.
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
      var latlng = {lat:latitude, lng: longitude}
      var geocoder = new google.maps.Geocoder();
      var forecastURL = 'https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/' + latitude + "," + longitude + "?callback=?&units=si"
         
      $.getJSON(forecastURL, function(data) {
            temperature =" Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C"
            icon = data.currently.icon
            summary =  '<img  class="mdl-list__item-icon" src="images/' + icon + '.png"></img>' + data.currently.summary  +    temperature ;
            
          geocoder.geocode({'location': latlng}, function(results, status) {
                currentLocation = results[1].formatted_address;
                console.log(currentLocation)
                var listHTML = document.createElement("li")
                document.getElementById("currentLocation").innerHTML = '  <li id= currentLocation class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(temp, i);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + currentLocation + '</span> <span id="weather0" class="mdl-list__item-sub-title">' + summary +  '</span> </span></li>';
              document.getElementById('locationList').appendChild(listHTML);
            });
            
       });
  };
  navigator.geolocation.getCurrentPosition(success);
}

function LocationweatherForecastSummary(forecastURL){ //adds weather summary using forecast io api.
            var data;
//converts the data using json and grabs the temperature and weather summary.
            $.getJSON(forecastURL, function(data) {
            temperature =" Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C"
            icon = data.currently.icon
            summary =  '<img  class="mdl-list__item-icon" src="images/' + icon + '.png"></img>' + data.currently.summary  +    temperature ;
            return summary
            });
}
