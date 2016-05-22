// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

//var tempLocation = JSON.parse(localStorage.getItem(APP_PREFIX))
//var locationName = tempLocation[0]
//localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(locationName));
    

function viewLocation(clicked_id)
{
    i = clicked_id
    //Turns location back into object

  var selectedLocation =  temp[i]
   
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(temp[i]));

   
    // And load the view location page.
     location.href = 'viewlocation.html';
}


 function weatherForecastSummary(){//adds summary to the main page
      
  return $.ajax({
  url: "https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/" + temp[i].latitude + "," + temp[i].longitude + '?units=si',
  jsonp: "callback",
  dataType: "jsonp",
  success: function(data, temp ) {
      
   temperature = Math.round(data.currently.temperature)  + "\u00B0" + "C"
  summary = data.currently.summary + " " + temperature ;
console.log(temperature)
updateSummary(temp)
      return summary
  }
      
});
  
 }
t=0
function updateSummary(){
     
document.getElementById(t).innerHTML = '<li id =' + t + ' ' + 'class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(this.id, temp);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + temp[t].nickname + '</span> <span id="weather0" class="mdl-list__item-sub-title">' + summary + '</span> </span></li>';
      document.getElementById('locationList').appendChild(testHTML);
    t++
}