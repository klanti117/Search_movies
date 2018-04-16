var express = require ("express");
var ejs = require ("ejs");
var request = require ("request");
var path = require ("path");
var app = express();
app.set("view engine","ejs");
//set static path
app.use(express.static(path.join(__dirname,'public')));
// app.use('/public/stylesheet',express.static('public'));
app.get('/',function(req, res){
    res.render("index");
});
app.get('/results',function(req, res){
  var query = req.query.searchedItem;
  var url ="http://www.omdbapi.com/?apikey=thewdb&s="+query;
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render("results",{data: data});
    }
    else{
      console.log("Something went wrong");
    }
  });
});
app.listen(3000, function(){
  console.log("started server");
});
