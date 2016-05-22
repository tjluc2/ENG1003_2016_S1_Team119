var locationCacheInstance = new LocationWeatherCache();

// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

var today = new Date();
dateString = today.simpleDateString();

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.


// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(lat, lng, nickname)
    {
        var forecasts = ""
        callbacks = {
            nickname: nickname,
            latitude: lat,
            longitude: lng,
            forecasts: forecasts
        };
        var index = nickname
        locationCacheInstance.toJSON(callbacks, index)
        return index
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
       console.log(selectedLocation) //works 2nd time round
           //if we do a for loop from the beggining, then we could create a callback structure thing for each time instead of an array, then push 2 callbacks into locations
        var list = JSON.parse(localStorage.getItem(APP_PREFIX)) || []
       i = 0
       while(i + 1 <= list.length){
       temp = {
            nickname: list[i].nickname,
            latitude: list[i].latitude,
            longitude: list[i].longitude,
            forecasts: list[i].forecasts
        };
           i++
        if (temp.longitude === selectedLocation.longitude && temp.latitude === selectedLocation.latitude ){
            console.log("not adding it")
        }
           else{
        locations.push(temp)          
           }
       }
       
        //locations.push(temp2)
        saveLocations(locations, index)
        alert(selectedLocation.nickname + " has been removed from storage!");
    }; 
    
    

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function(callbacks, index) 
    {
       //if we do a for loop from the beggining, then we could create a callback structure thing for each time instead of an array, then push 2 callbacks into locations
        var list = JSON.parse(localStorage.getItem(APP_PREFIX)) || []
       console.log(list.length) //works 2nd time round
       i = 0
       while(i + 1 <= list.length){
       temp = {
            nickname: list[i].nickname,
            latitude: list[i].latitude,
            longitude: list[i].longitude,
            forecasts: list[i].forecasts
        };
           i++
       
        locations.push(temp)          
          
       }
        locations.push(callbacks)
<<<<<<< HEAD
        //locations.push(temp2)
=======
        locations.push(list)
>>>>>>> origin/master
        saveLocations(locations, index)
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations(locations, index)
{
    localStorage.setItem(APP_PREFIX, JSON.stringify(locations));
    
    
}

function lukeDate(){
  var dat = sliderDate.simpleDateString() + "T12:00:00";
console.log(dat)
}