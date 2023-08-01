// We have an initial static element 
var mmaFights = document.getElementById('mma-fights');
// Button click to API call
var fetchButton = document.getElementById('fetch-button');
// element to display the form
var fightsFormEl = document.querySelector('#fights-form');
var nameInputEl = document.querySelector('#nameinput');
// container to display the fights
var fightContainerEl = document.querySelector('#fights-container');
var fightSearchTerm = document.querySelector('#fight-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var name = nameInputEl.value.trim();

  if (name) {
    getUserRepos(name);

    fightContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a UFC fight name');
  }
};

var buttonClickHandler = function (event) {
  // What is `event.target` referencing?
  // TODO: Write your answer here
  var fighter = event.target.getAttribute('data-fighter');

  // Why is this `if` block in place?
  // TODO: Write your answer here
  if (fighter) {
    getFeaturedRepos(fighter);

    repoContainerEl.textContent = '';
  }
}

var getFighterData = function (user) {
  var apiUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Fighters?key=a9c3522c4f0548e0a9e4e258699591f8' + user + '/repos';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};


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
        const myImage = new Image(300, 200);

        // Parsing the data
        name.textContent = ufc[i].Name;
        shortName.textContent = ufc[i].ShortName;
        day.textContent = ufc[i].Day;
        myImage.src = './assets/images/UFC-FN-Strickland-vs-Imavov-1_2560x (1).jpg';
        
        // Create dynamic element on the page 
        mmaFights.append(name);
        mmaFights.append(shortName);
        mmaFights.append(day);
        mmaFights.append(myImage);
      }
    });
}

fetchButton.addEventListener('click', getApi);
