const mongoose = require('../db/connection');
const {Schema} = mongoose;

//user schema for user database 

const commentSchema = new Schema({
    comment: {type: String, required: true}, 
    createdAt: {
        type: Date,
        default: Date.now,
    }, 
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;