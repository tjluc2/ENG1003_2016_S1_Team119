// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation()
{
    var tempLocationAsObject = JSON.parse(localStorage.getItem(APP_PREFIX))
    var locationName = tempLocationAsObject[0]
    console.log(locationName)
    
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    
    
    var locationA = document.getElementById('locationA');
    locationA.innerHTML = locationName;                         //Changes 'location A' to name of the location
    
    var locationB = document.getElementById('locationB');
    locationB.innerHTML = locationName;         
    
    

   
    // And load the view location page.
    // location.href = 'viewlocation.html';
}
