var service = {};
var onMediasReady;

service.fetchGrams = function (latlng) {
	var xhttp = new window.XMLHttpRequest();

	xhttp.open("GET", "./grams?lat=" + latlng.lat + "&lng=" + latlng.lng, true);
  xhttp.send();

	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var mediaStream = JSON.parse(xhttp.responseText);
      if(service.onmediasready) {
        service.onmediasready(mediaStream);
      }
		}
	};
}


module.exports = service;
