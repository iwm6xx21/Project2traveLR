const mongoose = require('../db/connection');

//post schema for user database 

const postSchema = new mongoose.Schema({
    location: {type: String}, 
    img: {type: String, required: true},
    description: {type: String}

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;