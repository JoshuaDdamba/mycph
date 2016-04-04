var L = require('L');
console.log(L);
var map;
var service = {};

//L.Icon.Default.imagePath = "/build/location/";

var clickHandler;

service.addMarker = function (lat, lng, thumbnail) {

  var icon =  L.icon({
    iconUrl: thumbnail,
    iconSize: [70, 70],
    popupAnchor: [0,-15]
  });


    //var hightUrl = data.images.standard_resolution.url
  //  var imgUrl = this.thumbnail;

  // create popup contents
      var customPopup = "<br/><img src='"+thumbnail+"'  width='140px' length='140px'/>"; //"Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";

 // specify popup options
      var customOptions =
          {
          'maxWidth': '500',
          'className' : 'custom'
          }

  console.log(icon);
  //L.marker([lat, lng], {icon:icon}).addTo(map);
  L.marker([lat, lng], {icon:icon}).bindPopup(customPopup,customOptions).addTo(map);
}

service.buildMap = function () {

//connection
  map = L.map('map').setView([55.676023,12.569031], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 30,
    id: 'ddamba.ofm04n7i',
    accessToken: 'pk.eyJ1IjoiZGRhbWJhIiwiYSI6Ik9vX1VPdmcifQ.nEbSOXJ-DWVGhiEY771xvg'
  }).addTo(map);

  if(service.clickHandler) {
    map.on('click', function(e) {
      return service.clickHandler(e.latlng);
    });
  }
}

service.init = function (options) {
  if(options.clickHandler) {
    clickHandler = options.clickHandler;
  }
}

module.exports = service;
