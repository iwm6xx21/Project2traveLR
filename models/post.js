const mongoose = require('../db/connection');
const Comment = require('./comments')
const User = require('./user')
const {Schema} = mongoose;
//post schema for user database 

const postSchema = new Schema({
    location: {type: String}, 
    img: [
        {
            url: String,
            filename: String
        }
    ],
    description: {type: String},
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

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
]

});


// middleware to delete comments from database once a post is deleted

postSchema.post('findOneAndDelete', async function (doc) {

    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})




const Post = mongoose.model('Post', postSchema);





module.exports = Post;