// HTML elements
const locationInput = document.getElementById('location-input');
const weatherDisplay = document.getElementById('weather-display');

// API key for OpenWeatherMap
const apiKey = 'YOUR_API_KEY';

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching weather data:', error);
    return null;
  }
}

// Function to display weather information
function displayWeather(weatherData) {
  if (!weatherData) {
    weatherDisplay.textContent = 'Error fetching weather data.';
    return;
  }
  
  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  
  weatherDisplay.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
  `;
}

// Event listener for form submission
document.getElementById('weather-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = locationInput.value;
  const weatherData = await fetchWeatherData(location);
  displayWeather(weatherData);
});
