var issueContainer = document.getElementById('champions');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
  const apiUrl = 'https://api.sportradar.com/mma/trial/v2/en/competitors/sr%3Acompetitor%3A237652/versus/sr%3Acompetitor%3A237640/summaries.json?api_key=vNGpDtyRW26ZQNutJ8jmk2gIstLvCeZx8e0kVFoW';
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch(apiUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var name = document.createElement('h3');
        var abbreviation = document.createElement('p');
        var competitors = document.createElement('h4');
        var issueHr = document.createElement('hr');

        name.textContent = data[i].name;
        abbreviation.textContent = data[i].abbreviation;
        competitors.textContent = data[i].competitors;

        issueContainer.append(name);
        issueContainer.append(abbreviation);
        issueContainer.append(competitors);
        issueContainer.append(issueHr);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

fetchButton.addEventListener('click', getApi);
