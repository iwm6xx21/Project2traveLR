const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Post = require('../models/post')





// route for posting new user information to database, giving new user access to home page, and automatically logging them in for the best user experience. 
//bcrypt & hash added to password data to keep password secure
// conditional statements added to ensure username is not already taken and the 'Verify-Password' field matches what was entered into the initial 'password' field. 

router.post('/signup', async (req, res, next) => {

    try {
        if (req.body.password === req.body.verifyPassword) {
            const desiredUsername = req.body.username
            const userExists = await User.findOne({ username: desiredUsername })
            if (userExists) {
                req.session.message = 'Username already in use'
                res.redirect('/')
                 
            } else if(req.body.password.indexOf(' ') !== -1) {
                req.session.message = 'Password cannot contain spaces'
                res.redirect('/')
            } else if(req.body.password.length < 6) {
                req.session.message = 'Password must contain atleast 6 characters'
                res.redirect('/')
            }
            else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                // auto login after signup for best user experience.
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

router.post('/login', async (req, res, next) => {
    try {
        const userLogin = await User.findOne({ username: req.body.username })
        if (userLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userLogin.password)
            if (validPassword) {
                req.session.username = userLogin.username
                req.session.loggedIn = true
                // the below code will return a user that is not logged in to their initial request once they are logged in. 
                const redirectUrl = req.session.returnTo || '/home';
                delete req.session.returnTo;
                res.redirect(redirectUrl)
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


// log out route. Destroys session and takes user back to login/signup page on click

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/home')
})



module.exports = router