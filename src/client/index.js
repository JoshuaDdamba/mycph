var mapService = require('./map');
var gramService = require('./gram');
var service = {};
var $app;

function makeMapBox() {
  
  var $map = document.createElement("div");
  $map.id = "map";
  
  $app.appendChild($map);

  mapService.buildMap();
  return $map;
}

function run () {
  
  gramService.onmediasready= function (medias) {
    medias.forEach(function(media) {
      if(media.location) {
        console.log(media);
        mapService.addMarker(
          media.location.latitude, 
          media.location.longitude,
          media.images.thumbnail.url);
      }
    })
  }

  mapService.clickHandler = gramService.fetchGrams;

  var $map = makeMapBox();
}

var mycph = window.mycph || {};

mycph.init = function($container) {
  $app = $container;
  $app.innerHTML = "";
}

mycph.run = function () {
  if(typeof $app === 'undefined') 
    throw new Error("the app must provide a DOM container");

  run();
}

window.mycph = mycph;

/*domready(function () {
  var myc = {};

  myc.init = function ($container) {
    if(typeof $container === 'undefined')
      throw new Error("you must provide a container element for the application");

    $app = $container;
  }

  myc.run = function () {
    run();
  }

  exports.myc = myc;

});

var $app;*/
/*service.getDataFromServer = function (callback) {
	var xhttp = new window.XMLHttpRequest();

	xhttp.open("GET", "./grams", true);
  xhttp.send();

	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var mediaStream = JSON.parse(xhttp.responseText);
			callback(mediaStream);
		}
	};
}

service.renderPage = function (medias) {
	var $mycph = document.getElementById("mycph");
  var $medias = document.createElement("medias");
  // the 'grams' objects are contained in 'medias'
  console.log(medias);
  medias.forEach(function(media) {
    var $media = document.createElement("div");
    $media.id = "media";
    
    $media.appendChild( document.createTextNode("id: ") );
    $media.appendChild( document.createTextNode(media.id) );
    $media.appendChild( document.createElement("br") );
    $media.appendChild( document.createTextNode("location: ") );
    $media.appendChild( document.createTextNode(media.location.latitude + ", ") );
    $media.appendChild( document.createTextNode(media.location.longitude + ", ") );
    $media.appendChild( document.createTextNode(media.location.name) );
    $media.appendChild( document.createElement("hr") );

    $medias.appendChild($media);
  });
	$mycph.appendChild($medias);

}*/
