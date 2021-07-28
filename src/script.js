const Leaflet = require("leaflet");

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
