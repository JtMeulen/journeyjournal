var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Post = require('./models/posts');
var keys = require("./keys");

mongoose.connect(keys.DBURL);
// mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/newzealand', function(req, res){
    res.render('stories/newzealand');
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


// Blog ROUTES
app.get('/blog', function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            res.render("ERROR. COME BACK LATER");
        } else {
            res.render('blog/blog', {posts: posts});
        }
    }); 
});

app.get('/blog/new', function(req, res){
    res.render('blog/new');
});

app.post('/blog', function(req, res){    
    var newPost = req.body; 
    newPost.date = new Date();   
    Post.create(newPost, function(err, newPost){
        if(err){
            alert("FAILED TO POST");
        } else {
            res.redirect('/blog');
        }
    });
});

app.listen(3000, function(){
    console.log("APP RUNNING on PORT 3000");
});