var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var Post = require('./models/posts');
var User = require('./models/user');
// var keys = require("./keys");

var url = process.env.DBURL || keys.DBURL;
mongoose.connect(url);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This text could be anything, tbh!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// Middleware to retrieve last date of blog, so we can set the cookie and make a marker in navbar
app.use(function(req, res, next){
    Post.find({}, function(err, posts){
        if(err){
            next();
        } else {
            if(posts.length > 1) {
                posts.sort(function(a, b) {
                    var dateA = new Date(a.date), dateB = new Date(b.date);
                    return dateB - dateA;
                });
            }
            res.locals.latestDate = posts[0].date;
            next();
        }
    }); 
});

// WORLD MAP
app.get('/', function(req, res){
    res.render('landing');
});

// JOURNALS
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

// ABOUT US
app.get("/about-us", function(req, res){
    res.render("about-us")
})

// Blog ROUTES
app.get('/blog', function(req, res){
    Post.find({}, function(err, posts){             
        if(err){
            res.render("ERROR. COME BACK LATER");
        } else {
            if(posts.length > 1) {
                posts.sort(function(a, b) {
                    var dateA = new Date(a.date), dateB = new Date(b.date);
                    return dateA - dateB;
                });
            }   
            res.render('blog/blog', {posts: posts});
        }
    }); 
});

app.get('/blog/new', isLoggedIn, function(req, res){
    res.render('blog/new');
});

app.post('/blog', isLoggedIn, function(req, res){    
    var newPost = req.body;
    newPost.date = new Date().toUTCString().slice(0, 25);   
    Post.create(newPost, function(err, newPost){
        if(err){
            alert("FAILED TO POST");
        } else {
            res.redirect('/blog');
        }
    });
});

// //AUTH ROUTES
app.get("/login", function(req, res){
    res.render("auth/login");
})

// Login route
app.post("/login", function(req, res, next){
    passport.authenticate("local", {
        successRedirect: "/blog/new",
        failureRedirect: "/blog"
    })(req, res, next);
});

// app.get("/signup", function(req, res){
//     res.render('auth/signup')
// });
// // handle sign up logic
// app.post("/signup", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             return res.redirect("/blog");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/blog/new");
//         });
//     });
// });

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blog");
}

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("APP RUNNING on PORT ", process.env.PORT || 3000);
});