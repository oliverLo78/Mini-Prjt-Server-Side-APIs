// We have an initial static element 
var mmaFights = document.getElementById('mma-fights');
var fighterButtonsEl = document.querySelector('#fighter-buttons');
// Button click to API call
var fetchButton = document.getElementById('fetch-button');
// element to display the form
var fightFormEl = document.querySelector('#fight-form');
var fighternameEl = document.querySelector('#fightername');
// container to display the fights
var fightContainerEl = document.querySelector('#fights-container');
var fightSearchTerm = document.querySelector('#fight-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var fightername = fighternameEl.value.trim();

  if (fightername) {
    getFighterData(fightername);

    fightContainerEl.textContent = '';
    fighternameEl.value = '';
  } else {
    alert('Please enter a UFC fighter name');
  }
};

var buttonClickHandler = function (event) {
  // What is `event.target` referencing?
  // TODO: Write your answer here
  var fighter = event.target.getAttribute('data-fighter');

  // Why is this `if` block in place?
  // TODO: Write your answer here
  if (fighter) {
    getFeaturedFighters(fighter);

    fightContainerEl.textContent = '';
  }
}

var getFighterData= function (fighter) {
  var apiUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Fighter/{fighterid}?key=a9c3522c4f0548e0a9e4e258699591f8' + fighter + '/fighter';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayFighters(data, fighter);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Sports Data');
    });
};

var getFeaturedFighters = function (stats) {
  // What are the query parameters doing here?
  // TODO: Write your answer here
  var apiUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Fighter/{fighterid}?key=a9c3522c4f0548e0a9e4e258699591f8' + stats + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayFighters(data.items, stats);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayFighters = function (fighter, searchTerm) {
  if (fighter.length === 0) {
    fightContainerEl.textContent = 'No fighter found.';
    // What would happen if there was no `return;` here?
    // TODO: Write your answer here
    return;
  }

  fightSearchTerm.textContent = searchTerm;

  for (var i = 0; i < fighter.length; i++) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    var fightName = fighter[i].owner.login + '/' + fighter[i].name;

    var fightEl = document.createElement('div');
    fightEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = fightName;

    fightEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (fighter[i].wins_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + fighter[i].wins_count + ' Win(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    fightEl.appendChild(statusEl);

    fightContainerEl.appendChild(fightEl);
  }
};

fightFormEl.addEventListener('submit', formSubmitHandler);
fighterButtonsEl.addEventListener('click', buttonClickHandler);

//   getApi function is called when the fetchButton is clicked
function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl ='https://api.sportsdata.io/v3/mma/scores/json/Schedule/{league}/{season}?key=a9c3522c4f0548e0a9e4e258699591f8';

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
