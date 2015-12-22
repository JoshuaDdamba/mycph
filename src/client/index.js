console.log("myCph is ready to rock");

var service = {};

service.getDataFromServer = function (callback) {
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

}

var mycph = service;

mycph.getDataFromServer(mycph.renderPage);
