// Code for the main app page (locations list).
//This object will store the location data for the current location.
var currentLocationObject ={};
/*
 * This function is called when the page loads.
 * Function: geoFindMe()
 * Authors: Luke Waldren, Raymond Fu, Taylah Lucas, Abe Lawson.
 * Since: 24/5/2016
 * Modified: 29/05/2016
 * Param list: 
 * Return list: 
 * Description: This function will use geocoder to find current position and pass that to the DarkSky forecast api. Giving a current location and weather.
 * Pre-condition: must have a valid API key, GPS, longitude, latitude. Must also have a working internet connection.
 * Post-condition: none.
 *
 * Input : current position
 * Output: current location, weather summary
 */
function geoFindMe() { //using geocoder grabs the current position, and creates the variable currentLocation which is the formatted address from the gecoder.
  function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude; //current longitude and latitude values
      var latlng = {lat:latitude, lng: longitude} //create latlng variable
      var geocoder = new google.maps.Geocoder(); //intitiates the geocoder
      var forecastURL = 'https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/' + latitude + "," + longitude + "?callback=?&units=si" //forecast.io url containing current lat and lng.
      
      $.getJSON(forecastURL, function(data) { //Calls the forecast api to obtain weather information.
            temperature =" Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C" +  "  "  + "Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C" //Temperatures
            icon = data.currently.icon //Icon to be displayed
            summary =  '<img  class="mdl-list__item-icon" src="images/' + icon + '.png"></img>' +     temperature ; //summary is the HTML that will display the information in the li element.
            geocoder.geocode({'location': latlng}, function(results, status) {
            currentLocation = results[1].formatted_address; //the formatted address of the lat and lng we gave to the geocoder.
            currentLocationObject = { //An object that will contain values obtained from the geocoder.
                nickname: currentLocation,
                latitude: latitude,
                longitude: longitude,
                forecasts: forecasts = {} //no need to store forecast information.
            }    
            var listHTML = document.createElement("li") //Grab the list element and assign new HTML to replace the old HTML previously set.
            document.getElementById("currentLocation").innerHTML = '  <li id= currentLocation class="mdl-list__item mdl-list__item--two-line" onclick="viewCurrentLocation();"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + currentLocation + '</span> <span id="weather0" class="mdl-list__item-sub-title">' + summary +  '</span> </span></li>';
            document.getElementById('locationList').appendChild(listHTML); //append the list to include this updated HTML.
            });   
    });
  };
        navigator.geolocation.getCurrentPosition(success); 
}

function createLocationButtons(locations) {             
   i = 0
   //Sets the desciprtion to 'loading'
   var currentLocation = "Finding your location..."
   //this function finds the current position and returns a variable 'currentLocation' which is a string. Is is then put into the first list element, which is below. There is a error in chrome where it wont let you use location services from local files (file://index.html). I dont think its an issue, ive tested using a http python server and it works.
   geoFindMe(currentLocation);
    //This creates a new list element and sets the HTML for it. This list element displays the current location.
    var listHTML = document.createElement("li")
    listHTML.innerHTML += '   <li id= currentLocation class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + currentLocation + '</span> <span id="weatherCurrent" class="mdl-list__item-sub-title">This is your current location!</span> </span></li>';
    document.getElementById('locationList').appendChild(listHTML); //Appends location lists to include listHTML (our new list element). 
    loadLocations(storageList, i, locations) //Before loading the rest of the buttons we need to know whats in our local storage. So we call loadLocations. This function will determine whats in localStorage and then load the relevant list elements on the index page.           
} 

//This function is callled upon clicking the current location list element. It saves the currentLocationObject to localStorage and sends the user to the ViewCurrentLocation page
function viewCurrentLocation(){ 
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(currentLocationObject));
    location.href = 'viewCurrentlocation.html';
}

//This funciton is called upon clicking location list elements, it saves the index and location data to localStorage and then sends the user to the viewLocation page
function viewLocation(clicked_id){
    selectedIndex = clicked_id //Assigns the ID of the list element to a meaningful variable
    var selectedLocation =  storageList[selectedIndex] //using the selectedIndex we grab the relevant object from localstorage and push it into selectedStorage.
    localStorage.setItem(APP_PREFIX + "-index", selectedIndex);
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(storageList[selectedIndex]));
    // And load the view location page.
    location.href = 'viewlocation.html';
}

function weatherForecastSummary(){ //This function is called from loadLocations, it saves a date, latitude, longitude and key and passes them to getWeatherAtIndexForDate
    source = "mainPage" //Allows us to identify where getWeatherIndexForDate was called from.
    date  = new Date().toISOString().slice(0,10) + "T12:00:00"; //Gets currentDate in forecast.io compatible format
    lati = storageList[i].latitude; //saves latitude from localstorage
    longi = storageList[i].longitude; //saves longitude from localstorage
    key = lati + "," + longi + "," +  date //Creates a unique key
    locationCacheInstance.getWeatherAtIndexForDate(lati, longi, key, source ); //calls getWeatherAtIndexForDate and passes the variable from weatherForecastSummary.
}

t=0 //A temporary Index for use in this function.
function updateSummary(){ // modifies the html of each list elements using their ID which is their index in the local storage. Summary no longer is "loading..." but is now the weather summary
formatFix = ""; //We were experiencing format issues with the li elements when the name of the location was below 13 characters. FormatFix is a quick fix for this issue.
nickLength = storageList[t].nickname.length //Work out the length of the location name being displayed.
    while (nickLength < 13){ //If a nickname is less than this the format of the li is incorrect.
        formatFix += "a" //formatFix is white text, so it cannot be seen.
        nickLength++;
    }
listHTML = document.createElement("li") //Creates a new li element and sets the HTML to include a location name and weather information (summary).    
document.getElementById(t).innerHTML = '<li id =' + t + ' ' + 'class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(this.id, temp);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + storageList[t].nickname + '<span class=formatFix>' + formatFix + '</span>' + '</span> <span id="weather0" class="mdl-list__item-sub-title" >' + summary + '</span></span></li>';
      document.getElementById('locationList').appendChild(listHTML); //Appends the list to add this element.
    t++ //iterate t 
}




function LocationweatherForecastSummary(forecastURL){ //adds weather summary using forecast io api.
        var data;
        //converts the data using json and grabs the temperature and weather summary.
        $.getJSON(forecastURL, function(data) {
        temperature =" Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C  Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C"
        icon = data.currently.icon
        summary =  '<img  class="mdl-list__item-icon" src="images/' + icon + '.png"></img>' + data.currently.summary  +    temperature ;
        return summary
            });
}
