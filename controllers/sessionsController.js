const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const User = require('../models/user')
const { redirect } = require('express/lib/response')
const Post = require('../models/post')



// route for posting new user information to database and redirect new user to home page. 
//bycrypt added to password data to keep password secure

router.post('/', async (req, res, next) => {

    try {

        const salt = bycrypt.genSaltSync(10)
        const hashedPassword = bycrypt.hashSync(req.body.password, salt)
        req.body.password = hashedPassword
        const NewUser = await User.create(req.body) 
        req.session.username = NewUser.useranme
        req.session.loggedIn = true
            res.redirect('/home')
    } catch (err) {
        next(err)
    }
   
   
})






module.exports = router