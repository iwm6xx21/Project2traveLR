const mongoose = require('../db/connection');

//post schema for user database 

const postSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    img: {type: String, requied: true},
    description: {type: String}

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;