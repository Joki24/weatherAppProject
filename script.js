document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById('submitButton');
    let cityNameInput = document.getElementById('cityName');

    submitButton.addEventListener('click', function() {
        let cityName = cityNameInput.value;
        // Check if the city name is provided
        if (cityName.trim() === '') {
            alert('Please enter a city name.');
            return;
        }

        // Call function to fetch weather data
        getWeather(cityName);
    });

    function getWeather(cityName) {
        // Construct the API URL with the city name and your API key
        let apiKey = 'eac62cb337079c86edeffc949019a62f';
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
        // Send fetch request to the API
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the received weather data
            console.log(data);
            // Call function to display weather forecast
            displayWeather(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
        
    }
    function displayWeather(weatherData) {
        // Extract relevant information from the weatherData object
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const weatherDescription = weatherData.weather[0].description;
    
        // Create HTML elements to display the weather information
        const weatherContainer = document.getElementById('weatherForecast');
        weatherContainer.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature} K</p>
            <p>Humidity: ${humidity}%</p>
            <p>Weather Description: ${weatherDescription}</p>
        `;
    }    
    });