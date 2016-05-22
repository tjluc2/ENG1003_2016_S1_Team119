// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

//var tempLocation = JSON.parse(localStorage.getItem(APP_PREFIX))
//var locationName = tempLocation[0]
//localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(locationName));
<<<<<<< HEAD
=======
    

function viewLocation(index)
{
    //Turns location back into object
    console.log(index);
   
    
    //localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(nickname));
    
    //var div = document.getElementById('locationA');
    //ul = document.createElement('ul');
    
    //for (var i in locations) 
        //var li = document.createElement('li'),
        //content = document.createTextNode(locations.nickname);
        //li.appendChild(content);
        //ul.appendChild(li);
>>>>>>> origin/master
    
    //div.appendChild(ul);

function viewLocation(clicked_id)
{
    i = clicked_id
    //Turns location back into object

  var selectedLocation =  temp[i]
   
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(temp[i]));

   
    // And load the view location page.
     location.href = 'viewlocation.html';
}

<<<<<<< HEAD

 function weatherForecastSummary(){//adds summary to the main page
      var testHTML = document.createElement("li")  
  $.ajax({
  url: "https://api.forecast.io/forecast/cc76775d3f3464a6c4a3f856e0b11b05/" + temp[i].latitude + "," + temp[i].longitude,
  jsonp: "callback",
  dataType: "jsonp",
  success: function(data, temp) {
      output = data.currently.summary
      console.log(i)  
  document.getElementById("temp").value += data.currently.summary + " - " ;
      test(i)
  }      
});

     
 }


function test(){
   
        testHTML.innerHTML += '   <li id =' + i + ' ' + 'class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(this.id, temp);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png"> <span>' + 'temp[i].nickname' + '</span> <span id="weather0" class="mdl-list__item-sub-title">' + summary + '</span> </span></li>';

    document.getElementById('locationList').appendChild(testHTML);
}
=======
>>>>>>> origin/master
