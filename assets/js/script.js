var rankingsContainer = document.getElementById('rankings');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  var requestUrl = 'https://api.octagon-api.com/rankings';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (rankings) {
      console.log(rankings);

      for (var i = 0; i < rankings.length; i++) {
        // Creating dynamic element
        var hr = document.createElement('hr');
        var categoryName = document.createElement('h2');
        var champion = document.createElement('h3');
        var championName = document.createElement('h4');
        var fighters = document.createElement('tr');

        categoryName.textContent = rankings[i].categoryName;
        champion.textContent = rankings[i].champion.championName;
        championName.textContent = rankings[i].championName;
        fighters.textContent = rankings[i].fighters.name;
        
        rankingsContainer.appendChild(categoryName);
        rankingsContainer.appendChild(champion);
        rankingsContainer.appendChild(championName);
        rankingsContainer.appendChild(fighters);
        rankingsContainer.appendChild(hr);
      }
      
    });
}
fetchButton.addEventListener('click', getApi);

