
var forecastObject;
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
var storageList = JSON.parse(localStorage.getItem(APP_PREFIX)) || [] //define the localStorage globally.
function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
        var storageLength = (JSON.parse(localStorage.getItem(APP_PREFIX)) || []).length //length of storage.
        return storageLength;
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
        var forecasts = {} //create forecasts object
        callbacks = { //populates callbacks with values
            nickname: nickname,
            latitude: lat,
            longitude: lng,
            forecasts: forecasts
        };
        var index = nickname //define nickname as the index as it should be unique
        locationCacheInstance.toJSON(callbacks, index) //Call the function toJSON
        return index
    }

    // Removes the saved location at the given index.
    this.removeLocationAtIndex = function(index)
    {
    //Determines the length of the storageLength and grabs the index of the location wanting to be removed.
        var storageLength = locationCacheInstance.length()
        var index = JSON.parse(localStorage.getItem(APP_PREFIX + "-index"))
        i = 0 //Runs a loop where it re-creates each local storage object. Each object is pushed back to storage except the object with the selected index
        while(i + 1 <= storageLength){
            temp = {
            nickname: storageList[i].nickname,
            latitude: storageList[i].latitude,
            longitude: storageList[i].longitude,
            forecasts: storageList[i].forecasts
        };          
        if (i === index){ //Here we dont allow  the object at the selected index to be added to localStorage, effectively completing the remove functionality.
            console.log("not adding it") //A little bit of validation for us developers ;)    
        }
        else{
        locations.push(temp) //Every other object is pushed back into locations array.      
        }
        i++
       } 
       saveLocations(locations, index) //runs the function saveLocations and passes the locations array and index.
       alert(selectedLocation.nickname + " has been removed from storage!"); //Allows validation for the user to see that the location has been removed.
    }; 
    
    

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function(callbacks, index) 
    {
       var storageLength = locationCacheInstance.length() //get the length of storage
       i = 0
       while(i + 1 <= storageLength){ //create a new object for each index within the local storage array.
       temp = {
            nickname: storageList[i].nickname,
            latitude: storageList[i].latitude,
            longitude: storageList[i].longitude,
            forecasts: storageList[i].forecasts
        };
           i++  //iterate through the local storage array
        locations.push(temp)  //push each object into locations array   
          
       }
        locations.push(callbacks) //push callbacks to locations array.
        saveLocations(locations, index) //run saveLocations function.
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        while(i + 1<=storageList.length ){ //iterate through storagelist Index
        var listHTML = document.createElement("li") //create a list element.
        summary = "loading...";
        //creates list element with with index 'i' and summary, which is set to 'loading...'.
        listHTML.innerHTML += '   <li id =' + i + ' ' + 'class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(this.id, temp);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + storageList[i].nickname + '</span> <span id="weather0" class="mdl-list__item-sub-title">' + summary +  '</span> </span></li>';
        document.getElementById('locationList').appendChild(listHTML); //append the list to add this element.
         weatherForecastSummary(i) //runs weatherFunction to add weather to the list elements.
            i++                    
        }
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
                if(storageList[i].forecasts.hasOwnProperty(key)){ //searches forecast object within storageLists for the key.
          console.log("found in cache!") //validation for developer to see whats going on.
            if (source == "slider"){ //if this function was called from the viewLocationPage it will run this code.
            //Sets summary for viewLocationPage. Contains weather information
                summary = storageList[i].forecasts[key].summary + "\n" +  storageList[i].forecasts[key].maxTemp + "          " + storageList[i].forecasts[key].minTemp  + "\n" + storageList[i].forecasts[key].humidity + "   " + storageList[i].forecasts[key].windSpeed
                document.getElementById("weatherText").value = summary; //sets the textArea to display summary text.
            }
            if(source == "mainPage"){ //If function called from the mainPage.
                //adds to the html of the list items to include weather information.
                summary =  '<img  class="mdl-list__item-icon" src="images/' + storageList[i].forecasts[key].icon + '.png"></img>'  +    storageList[i].forecasts[key].maxTemp + "<br>"  + storageList[i].forecasts[key].minTemp ;
                updateSummary() //this function updates the main page summary's.
            }
      }
    else{
        //If the key was not present in the localStorage, then weatherResponse runs which will find the information online via forecast.io api and then add it to the localStorage under a key.
        locationCacheInstance.weatherResponse(lati, longi, key, i, source, date );
         
    }
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
        var data;
        console.log("Looking online for weather info!") //Just some more of that sweet validation going on in this line of code!
        //converts the data using json and grabs the temperature and weather summary.
        index = i
        var jqxhr = $.getJSON("https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/" + key + "?callback=?&units=si", function(data) {
        forecastObject = //this object contains all the weather information required for a location. It is saved into an object which will be pushed into the local Storage under forecasts.
                {
                summary : data.daily.data[0].summary,
                icon : data.daily.data[0].icon,
                maxTemp : "Max: " + Math.round(data.daily.data[0].temperatureMax)  + "\u00B0" + "C",
                minTemp : "Min: " + Math.round(data.daily.data[0].temperatureMin)  + "\u00B0" + "C" ,
                humidity : "Humidity: " + Math.round(data.daily.data[0].humidity *100) + "%",
                windSpeed : "Wind speed: " + Math.round(data.daily.data[0].windSpeed *3.6) + "km/h"
                
                }
              
                
                
                 storageList[index].forecasts[key] = forecastObject //Adds the key to forecasts and sets the key to contain forecastObject.
                 localStorage.setItem(APP_PREFIX, JSON.stringify(storageList)); //Sets the new storageList.
           
                if(source == "slider"){
                    
                 weatherForecastSlider() //If this function was called from the viewLocationPage run the slider function.
                }
                if(source =="mainPage"){
                   //If it was called from the mainPage, set some new HTML code for the list items which will update their weather status.
                   summary =  '<img  class="mdl-list__item-icon" src="images/' + storageList[index].forecasts[key].icon + '.png"></img>' +    storageList[index].forecasts[key].maxTemp + "\n" + storageList[index].forecasts[key].minTemp ;
                    updateSummary(summary) //Grabs the new HTML and passes it into this update function.
                }
            });  
       
        }

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
function loadLocations(locations)
{
    if(storageList == null){ //if storageList is empty do nothing.
    
    }
    else{
        locationCacheInstance.initialiseFromPDO() //run the command to populate the lists.
    }
}
// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations(locations, index)
{
    localStorage.setItem(APP_PREFIX, JSON.stringify(locations)); //Save the locations object to localStorage.  
}

