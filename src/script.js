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
  if (ValidIpAddressRegex.test(searchValue)) {
    loader.style.display = "flex";
    resultBox.style.display = "none";
    fetchOnIp(searchValue);
  } else {
    loader.style.display = "flex";
    resultBox.style.display = "none";
    fetchOnDomain(searchValue);
  }
});
let lat = 51.505;
let lang = -0.09;
//const myMap = document.getElementById("my-map");
const accessToken =
  "pk.eyJ1IjoiZGV2YmlsbHkiLCJhIjoiY2tybjU2MWg1MHRyZDJybnZwdzBkbjJ1ZSJ9.wpkz8I0D7veTwCUjANha0Q";

buildMap(lat, lang);

function fetchOnIp(ipAddress) {
  const API_KEY = "at_QY2m6gKaAP8QJGKvKv64W9vlgsYgk";
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ipAddress}`,
    requestOptions
  )
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

function fetchOnDomain(domain) {
  const API_KEY = "at_QY2m6gKaAP8QJGKvKv64W9vlgsYgk";
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&domain=${domain}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .then((data) => {
      loader.style.display = "none";
      resultBox.style.display = "flex";
      if (data.code === undefined) {
        ipResult.innerHTML = data.ip;
        locationResult.innerHTML = `${data.location.city}, ${data.location.country}`;
        timezoneResult.innerHTML = `UTC ${data.location.timezone}`;
        ispResult.innerHTML = data.isp;
        buildMap(data.location.lat, data.location.lng);
      }
      //return { lat: data.location.lat, long: data.location.lng };
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
