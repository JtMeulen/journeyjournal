var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    date: String,
    post: String,
    location: String,
    images: Array
});

module.exports = mongoose.model("Post", PostSchema);