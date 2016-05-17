
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
    this.length = function(cache) {
        
        console.log(cache.length)
        
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
       
        console.log(locations[index])
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        var locations = {
             latitude:latitude,
             longitude:longitude,
             nickname:nickname   
    };
         locations.push({latitude, longitude, nickname});  [{latitude, longitude, nickname},{latitude, longitude, nickname},] 
         console.log(locations.length-1)
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        localStorage.removeItem(i);
        updatalocationlist();  
        
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
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
          document.getElementById("weather").innerHTML="'<h2>Current Weather</h2>'"
    addicon(result.currently.icon,"weather");
 var summary=result.currently.summary;
 var temperature=result.currently.temperature+" ℃";
 var humidity=result.currently.humidity*100+"%";
 var windSpeed=(result.currently.windSpeed)*3.6+" km/h";
 document.getElementById("weather").innerHTML+='<span class="tittle">Current Weather condition:</span>'+summary+"<br>"+'<span class="tittle">Current temperature:</span>'+temperature+"<br>" +'<span class="tittle">Current humidity:</span>'+humidity+"<br>" +'<span class="tittle">Windspeed:</span>'+windSpeed+"<br>" 
  
 currentUNIXtime=result.hourly.data[0].time; // find hour with nearest hour  
 findtime(currentUNIXtime);

// document.getElementById("next7day").innerHTML="";    
 for (var i=1;i<=7;i++)  {
     document.getElementById("day"+i).innerHTML="";  
    var myDate = new Date( result.daily.data[i].time*1000); // change unix time to real time
    var dayy=myDate.getDay();  
    document.getElementById("day"+i).innerHTML+='<span class="day">Day:</span>'+day[dayy]+"<br>";
    document.getElementById("day"+i).innerHTML+='<span class="tittle">Minimum Temperature:</span>'+result.daily.data[i].temperatureMin+"℃"+"<br>";
    document.getElementById("day"+i).innerHTML+='<span class="tittle">Maximum Temperature:</span>'+result.daily.data[i].temperatureMax+"℃"+"<br>";
    addicon(result.daily.data[i].icon,"day"+i);
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
    longitude =  JSON.parse(localStorage.getItem(i)).long;
latitude  =  JSON.parse(localStorage.getItem(i)).lat;
initMap();
x.innerHTML="";
findweather();
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
}

////////////////////////////////////////////////////////////////////////////////

'use strict';

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', 
  function($q, $resource, $http, FORECASTIO_KEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  var weatherResource = $resource(url, {
    callback: 'JSON_CALLBACK',
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    //getAtLocation: function(lat, lng) {
    getCurrentWeather: function(lat, lng) {
      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    }
  }
}];

angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
var cities = [
    { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },
    { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },
    { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },
    { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },
    { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },
    { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },
    { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }
  ];

  return {
    all: function() {
      return cities;
    },
    get: function(cityId) {
      // Simple index lookup
      return cities[cityId];
    }
  }
}).
factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {
        city:       'Miami',
        latitude:   25.7877,
        longitude:  80.2241 };

    DataStore.setCity = function (value) {
       DataStore.city = value;
    };

    DataStore.setLatitude = function (value) {
       DataStore.longitude = value;
    };

    DataStore.setLongitude = function (value) {
       DataStore.longitude = value;
    };

    return DataStore;
})
.factory('Weather', forecastioWeather);
