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
  "Saturday"
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
  "December"
];
let currentYear = today.getFullYear();
let currentDay = days[today.getDay()];
let currentMonth = months[today.getMonth()];
let currentDate = today.getDate();
day.innerHTML =
  currentDay + " " + currentDate + " " + currentMonth + " " + currentYear;

function displayWeatherCondition(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humid");
  humid.innerHTML = `${humidity}%`;
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}°C`;
  let wind = response.data.wind.speed;
  let windy = document.querySelector("#wind-speed");
  windy.innerHTML = `${wind}m/s`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
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

let form = document.querySelector("#search");
form.addEventListener("submit", suchen);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
