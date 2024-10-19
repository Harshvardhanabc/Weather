const apiKey = 'ZHwdZeINj47nU3nULumlM2Yy6PUKKHt0'; // Replace with your Tomorrow.io API key

document.getElementById('getWeather').addEventListener('click', function () {
    const location = document.getElementById('latInput').value; // Get location from input
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeather(location) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json' },
    };

    // Fetch real-time weather data from Tomorrow.io API
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found. Please check the location.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(err => {
            console.error('Error:', err);
            alert('An error occurred while fetching weather data. Please try again later.');
        });
}

function displayWeather(data) {
    const weatherData = data.data.values; // Accessing values from the API response
    const locationName = data.location.name; // Getting location name

    // Displaying weather data
    document.getElementById('cityName').textContent = `🌍 ${locationName}`;
    document.getElementById('temperature').textContent = `Temperature: 🌡${weatherData.temperature}°C`;
    document.getElementById('description').textContent = `Humidity: ${weatherData.humidity}% | Wind Speed: ${weatherData.windSpeed} km/s | Visibility: ${weatherData.visibility} km | Wnid Direction: ${weatherData.windDirection}°`;
}
