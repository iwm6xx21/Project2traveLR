const mongoose = require('../db/connection');
const {Schema} = mongoose;
//post schema for user database 

const postSchema = new Schema({
    location: {type: String}, 
    img: {type: String, required: true},
    description: {type: String},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;