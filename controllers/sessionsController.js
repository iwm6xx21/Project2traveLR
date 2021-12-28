const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Post = require('../models/post')





// route for posting new user information to database and giving new user access to home page. 
//bcrypt added to password data to keep password secure
// conditional statements added to ensure username is not already taken and the 'Verify-Password' field matches what was entered into the initial 'password' field. 

router.post('/signup', async (req, res, next) => {

    try {
        if (req.body.password === req.body.verifyPassword) {
            const desiredUsername = req.body.username
            const userExists = await User.findOne({ username: desiredUsername })
            if (userExists) {
                req.session.message = 'User name already taken'
                res.redirect('/')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                res.redirect('/home')
            }
        } else {
            req.session.message = 'Create Password and Re-type Password fields must match'
            res.redirect('/')
        }
    } catch (err) {
        next(err)
    }
})


// route for existing user login
// conditional statements added to ensure username and password entered is correct 
// test example1 -  username: testy password: two
// test example1 -  username: will password: iam

router.post('/login', async (req, res, next) => {
    try {
        const userLogin = await User.findOne({ username: req.body.username })
        if (userLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userLogin.password)
            if (validPassword) {
                req.session.username = userLogin.username
                req.session.loggedIn = true
                res.redirect('/home')
            } else {
                req.session.message = "Incorrect username or password"
                res.redirect('/')
            }
        } else {
            req.session.message = 'Incorrect username or password'
            res.redirect('/')
        }
    } catch (err) {
        next(err)
    }
})


// log out route. Takes user back to login/signup page on click

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})



module.exports = router