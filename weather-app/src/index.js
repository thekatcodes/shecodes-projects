let dateNow = new Date();
console.log(dateNow);

function formatDate(dateNow) {
  let day = dateNow.getDay();
  console.log(day);

  let date = dateNow.getDate();
  console.log(date);

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = daysOfWeek[day];
  console.log(weekday);

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
    "October",
    "November",
    "December",
  ];
  let month = months[dateNow.getMonth()];
  console.log(month);

  let hour = dateNow.getHours();
  if (hour < 10) {
    hour = `0` + hour;
  }

  let minute = dateNow.getMinutes();
  if (minute < 10) {
    minute = `0` + minute;
  }

  let currentDate = `${weekday}, ${month} ${date} <br> ${hour}:${minute}`;
  return currentDate;
}

let today = document.querySelector(".date");
today.innerHTML = formatDate(dateNow);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }

  let searchInput = document.querySelector("#search-city").value;
  let city = searchInput;
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  let displayCity = document.querySelector(".city");
  let displayTemp = document.querySelector(".temp");
  let displayDesc = document.querySelector("#forecast-desc");
  let displayHumidity = document.querySelector(".humidity");
  let displayWind = document.querySelector(".wind");
  let displayIcon = document.querySelector("#icon");
  axios.get(apiUrl).then(function (response) {
    console.log(displayIcon);
    displayCity.innerHTML = response.data.name;
    displayTemp.innerHTML = Math.round(response.data.main.temp);
    displayDesc.innerHTML = response.data.weather[0].description;
    displayHumidity.innerHTML = Math.round(response.data.main.humidity);
    displayWind.innerHTML = Math.round(
      (response.data.wind.speed * 3600) / 1000
    );
    displayIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  });
}

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getPosition);

function findPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let displayPosition = document.querySelector(".city");
  let displayTemp = document.querySelector(".temp");
  let displayDesc = document.querySelector("#forecast-desc");
  let displayHumidity = document.querySelector(".humidity");
  let displayWind = document.querySelector(".wind");
  let displayIcon = document.querySelector("#icon");
  axios.get(apiUrl).then(function (pos) {
    displayPosition.innerHTML = pos.data.name;
    displayTemp.innerHTML = Math.round(pos.data.main.temp);
    displayDesc.innerHTML = pos.data.weather[0].description;
    displayHumidity.innerHTML = Math.round(pos.data.main.humidity);
    displayWind.innerHTML = Math.round((pos.data.wind.speed * 3600) / 1000);
    displayIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${pos.data.weather[0].icon}@2x.png`
    );
  });
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

function convertTempF() {
  let celcius = document.querySelectorAll(".temp");
  tempF.classList.toggle("disable-link");
  tempC.classList.toggle("disable-link");
  celcius.forEach(function (temperature) {
    let farenheit = Math.round(temperature.textContent * 1.8 + 32);
    temperature.textContent = farenheit;
  });
}

let tempF = document.querySelector(".link-f");
tempF.addEventListener("click", convertTempF);

function convertTempC() {
  let farenheit = document.querySelectorAll(".temp");
  tempF.classList.toggle("disable-link");
  tempC.classList.toggle("disable-link");
  farenheit.forEach(function (temperature) {
    let celcius = Math.round((temperature.textContent - 32) / 1.8);
    temperature.textContent = celcius;
  });
}

let tempC = document.querySelector(".link-c");
tempC.addEventListener("click", convertTempC);
