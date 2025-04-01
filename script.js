const apiKey = '9c4e9daa625ca9ed19ae7e623f294a13'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherContainer = document.getElementById('weatherContainer');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('windspeed');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
  const city = cityInput.value;

  if (!city) {
    alert('Please enter a city!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        weatherContainer.style.display = 'none';
        errorDiv.classList.remove('hidden');
      } else {
        errorDiv.classList.add('hidden');
        weatherContainer.style.display = 'block';
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windspeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to fetch weather data!');
    });
}
