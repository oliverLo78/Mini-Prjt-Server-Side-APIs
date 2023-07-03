var fightersList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

//getApi function is called when the fetchButton is clicked
function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl ='https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2023?key=a9c3522c4f0548e0a9e4e258699591f8';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      //looping over the fetch response and inserting the URL of your repos into a list
      for (var i = 0; i < data.length; i++) {
        //Create elements  
        var listItem1 = document.createElement('h1');
        var listItem2 = document.createElement('p');
        var listItem3 = document.createElement('li');

        //Set the text of the list element to the JSON response's .html_url property
        listItem1.textContent = data[i].Name;
        listItem2.textContent = data[i].ShortName;
        listItem3.textContent = data[i].Day;

        //Append the li element to the id associated with the ul element.
        fightersList.appendChild(listItem1, listItem2, listItem3);
      }
    });
}

fetchButton.addEventListener('click', getApi);
