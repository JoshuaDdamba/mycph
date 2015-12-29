var leaflet = require('leaflet');

var service = {};

service.buildMap = function ($container) {

  var map = leaflet.map('map').setView([55.676023,12.569031], 13);
  console.log(map);
  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ddamba.ofm04n7i',
    accessToken: 'pk.eyJ1IjoiZGRhbWJhIiwiYSI6Ik9vX1VPdmcifQ.nEbSOXJ-DWVGhiEY771xvg'
  }).addTo(map);
  
}


module.exports = service;
