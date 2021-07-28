const Leaflet = require("leaflet");

const searchField = document.getElementById("search-field");
const inputForm = document.getElementById("input-form");

const ValidIpAddressRegex =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchField.value;
  if (ValidIpAddressRegex.test(searchValue)) {
    fetchOnIp(searchValue);
  } else {
    fetchOnDomain(searchValue);
  }
});

//const myMap = document.getElementById("my-map");
const accessToken =
  "pk.eyJ1IjoiZGV2YmlsbHkiLCJhIjoiY2tybjU2MWg1MHRyZDJybnZwdzBkbjJ1ZSJ9.wpkz8I0D7veTwCUjANha0Q";
let myMap = Leaflet.map("my-map").setView([51.505, -0.09], 13);
L.tileLayer(
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
    .then((result) => console.log(result))
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
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
