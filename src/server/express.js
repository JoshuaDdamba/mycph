var express = require('express');
var grams = require('instagram-node').instagram();
var config = require('config');

var app = express();
var port = 3001;
var gramsConfig = config.get("mycph.grams");

grams.use({access_token: gramsConfig.access_token});
var access_parameters = {access_token: gramsConfig.access_token};

grams.use({
 client_id: gramsConfig.client_id,
 client_secret: gramsConfig.client_secret
});

/*$.ajax ({
// call the form
var form = $('#tagsearch');
form.on('submit', function(ev) {
    var q = this.tag.value;
    if(q.length) {
        //console.log(q);
        grabImages(q, 40, access_parameters);
    }
    ev.preventDefault();
});


// pass the form parameters to the url
function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'http://localhost:3001/?/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}
});*/
app.get('/grams',function(req,res){
  console.log("lat", req.query.lat);
  console.log("lng", req.query.lng);

  var lat = req.query.lat;
  var lng = req.query.lng;

  console.log(lat);
  //lat = 55.6903587538032;
  //lng = 12.54364013671875;
  //grams.media_search(55.676023,12.569031,function(err, medias, remaining, limit) {
  grams.media_search(Number(lat), Number(lng), function(err, medias, remaining, limit) {
      if(err) {
        throw new Error(err);
        res.send(err);
      }
      res.send(medias);
  });
});

app.use('/build', express.static(__dirname + '/../../build'));

app.use('/', function (req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
});

//app.use('/', express.static(__dirname + '/../../build'));

app.listen(3001, function(err) {
  if(err){
     console.log("Error");
  }else {
     console.log("Express server listening at port "+ port);
  }
});
