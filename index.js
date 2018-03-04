var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/newzealand', function(req, res){
    res.render('newzealand');
});

app.listen(3000, function(){
    console.log("APP RUNNING on PORT 3000");
});