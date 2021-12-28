const mongoose = require('../db/connection');

//post schema for user database 

const postSchema = new mongoose.Schema({
    location: {type: String}, 
    img: {type: String, required: true},
    description: {type: String},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;