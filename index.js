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

app.get('/srilanka', function(req, res){
    res.send('Sri Lanka');
});

app.get('/southafrica', function(req, res){
    res.send('southafrica');
});

app.get('/usa', function(req, res){
    res.send('USA');
});

app.get('/malaysia', function(req, res){
    res.send('malaysia');
});

app.listen(3000, function(){
    console.log("APP RUNNING on PORT 3000");
});