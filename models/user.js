const mongoose = require('../db/connection');
const {Schema} = mongoose;

//user schema for user database 

const userSchema = new Schema({
    username: {type: String, unique: true, required: true}, 
    password: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;