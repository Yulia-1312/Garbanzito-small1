let today = new Date();
let hour = today.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minute = today.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}
let time = hour + ":" + minute;
let currentTime = document.querySelector("#time");
currentTime.innerHTML = time;

let day = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];
let currentYear = today.getFullYear();
let currentDay = days[today.getDay()];
let currentMonth = months[today.getMonth()];
let currentDate = today.getDate();
day.innerHTML =
  currentDay + " " + currentDate + " " + currentMonth + " " + currentYear;

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humid");
  humid.innerHTML = `${humidity}%`;
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}°`;
  let wind = response.data.wind.speed;
  let windy = document.querySelector("#wind-speed");
  windy.innerHTML = `${wind}m/s`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#main");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
      <div class="card">
        ${formatDay(forecastDay.dt)}
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="30" />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function suchen(event) {
  event.preventDefault();
  let apiKey = "377e89a0dc03f60ffba1537682883ed7";
  let city = document.querySelector("#search-text-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function searchLocation(position) {
  let apiKey = "377e89a0dc03f60ffba1537682883ed7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function search(city) {
  let apiKey = "377e89a0dc03f60ffba1537682883ed7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search");
form.addEventListener("submit", suchen);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Cologne");
