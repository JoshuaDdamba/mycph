var express = require('express');
var grams = require('instagram-node').instagram();
var config = require('config');

var app = express();
var port = 3001;
var gramsConfig = config.get("mycph.grams");

grams.use({access_token: gramsConfig.access_token});

grams.use({
 client_id: gramsConfig.client_id,
 client_secret: gramsConfig.client_secret
});

app.use(express.static('./build'));

app.get('/grams',function(req,res){
  grams.media_search(55.676023,12.569031,function(err, medias, remaining, limit) {
      res.send(medias);
  });
});

app.listen(3001, function(err) {
  if(err){
     console.log("Error");
  }else {
     console.log("Express server listening at port "+ port);
  }
});
