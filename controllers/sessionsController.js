const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const User = require('../models/user')
const { redirect } = require('express/lib/response')


// route hit once user has either logged in to an existing account or registered for a new account
router.get('/home', (req, res) => {
    res.render('sessions/home')
    
})

// route for posting new user information to database and render user to home page. 

router.post('/home', async (req, res) => {
    const newUser = await User.create(req.body)
    req.session.username = newUser.username
    res.render('sessions/home')
})









module.exports = router