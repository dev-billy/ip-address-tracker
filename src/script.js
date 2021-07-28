require("dotenv").config();
const Leaflet = require("leaflet");

const locationMap = document.getElementById("location-map");

const searchField = document.getElementById("search-field");
const inputForm = document.getElementById("input-form");
const ipResult = document.getElementById("ip-result");
const locationResult = document.getElementById("location-result");
const timezoneResult = document.getElementById("timezone-result");
const ispResult = document.getElementById("isp-result");

const loader = document.getElementById("loader");
const resultBox = document.getElementById("results");

const ValidIpAddressRegex =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchField.value;
  loader.style.display = "flex";
  resultBox.style.display = "none";
  fetchData(searchValue);
});

//init lat & long

let lat = 51.505;
let lang = -0.09;
//const myMap = document.getElementById("my-map");
const accessToken = process.env.ACCESS_TOKEN;
const API_KEY = process.env.API_KEY;
buildMap(lat, lang);

function fetchData(value) {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let url;
  if (ValidIpAddressRegex.test(value)) {
    url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${value}`;
  } else {
    url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&domain=${value}`;
  }

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .then((data) => {
      loader.style.display = "none";
      resultBox.style.display = "flex";
      ipResult.innerHTML = data.ip;
      locationResult.innerHTML = `${data.location.city}, ${data.location.country}`;
      timezoneResult.innerHTML = `UTC ${data.location.timezone}`;
      ispResult.innerHTML = data.isp;
      buildMap(data.location.lat, data.location.lng);
      //  myMap = Leaflet.map("my-map").setView([51.505, -0.09], 13);
    })
    .catch((error) => console.log("error", error));
}

function buildMap(lat, long) {
  locationMap.innerHTML = "<div id='my-map'></div>";
  let myMap = Leaflet.map("my-map").setView([lat, long], 13);
  Leaflet.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken,
    }
  ).addTo(myMap);
}
