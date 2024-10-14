document.addEventListener('DOMContentLoaded', function () {
    const caseCountElement = document.getElementById('caseCount');
    const deathCountElement = document.getElementById('deathCount');
    const recoveredCountElement = document.getElementById('recoveredCount');
    const globalButton = document.getElementById('globalButton');
    const countryButton = document.getElementById('countryButton');
    const searchArea = document.getElementById('searchArea');
    const searchButton = document.getElementById('searchButton');
    const countryField = document.getElementById('countryField');

    function getGlobalData() {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                showError();
                console.error('Error fetching global data:', error);
            });
    }

    function getCountryData(country) {
        fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => {
                showError();
                console.error('Error fetching country data:', error);
            });
    }

    function displayData(data) {
        caseCountElement.textContent = data.cases.toLocaleString();
        deathCountElement.textContent = data.deaths.toLocaleString();
        recoveredCountElement.textContent = data.recovered.toLocaleString();
    }

    function showError() {
        caseCountElement.textContent = 'Error';
        deathCountElement.textContent = 'Error';
        recoveredCountElement.textContent = 'Error';
    }

    globalButton.addEventListener('click', function () {
        searchArea.classList.add('hidden');
        getGlobalData();
    });

    countryButton.addEventListener('click', function () {
        searchArea.classList.remove('hidden');
    });

    searchButton.addEventListener('click', function () {
        const country = countryField.value.trim();
        if (country) {
            getCountryData(country);
        }
    });

    // Fetch initial global data on load
    getGlobalData();
});
