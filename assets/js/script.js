// We have an initial static element 
var mmaFights = document.getElementById('mma-fights');
// Button click to API call
var fetchButton = document.getElementById('fetch-button');

//   getApi function is called when the fetchButton is clicked
function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl ='https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2023?key=a9c3522c4f0548e0a9e4e258699591f8';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (ufc) {
        console.log(ufc);
      //looping over the fetch response and inserting the URL of ufc fights 
      for (var i = 0; i < ufc.length; i++) {
        //Create elements  
        var name = document.createElement('h1');
        var shortName = document.createElement('p');
        var day = document.createElement('p');

        // Parsing the data
        name.textContent = ufc[i].Name;
        shortName.textContent = ufc[i].ShortName;
        day.textContent = ufc[i].Day;

        // Create dynamic element on the page 
        mmaFights.append(name);
        mmaFights.append(shortName);
        mmaFights.append(day);
      }
    });
}

fetchButton.addEventListener('click', getApi);
