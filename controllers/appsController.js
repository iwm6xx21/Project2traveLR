const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

// middleware to ensure a login to access new, edit, and delete routes. 

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        req.session.message = "Please log in or sign up to access this action"
        res.redirect('/')
    }
}

// assess if logged user can delete or edit posts based on their credentials
// const AuthRequiredAction = (req, res, next) => {
//     const user = User.findById(req.params.id)
//     if(req.session.username && user) {
//         next()
//     } else {
//         req.session.message = "access denied"
//         res.redirect('/home')
//     }

// }


// login and sign up route
router.get('/', (req, res)=> {
    
        res.render('index')
    })


// route to picture upload form

router.get('/new', authRequired, (req, res)=> {
    
    res.render('new')
})


// route to post new picture upload data to database 
router.post('/home', (req,res) => {
    Post.create(req.body, (err, posts) => {
        req.session.message = "Your adventure has been posted!"
        res.redirect('/home')

    });
   
})


// route to obtain new post data from database and render them to the home page
router.get('/home', (req, res)=> {
    Post.find({}, (err, posts) => {
        res.render('home', {posts})
    })
})


// route hit once user has either logged in to an existing account or registered for a new account
router.get('/home', (req, res) => {
    res.render('home')
    
})



// route to edit form 
router.get('/home/:id/edit', authRequired,(req, res)=> {
    Post.findById(req.params.id, (err, posts) => {
        res.render('edit', {posts})
    }) 
})

// post edits to database then redirect to the home page

router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedpost) =>{
        res.redirect('/home')
    })
})

// route to delete posted item

router.delete('/:id', authRequired, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, deletedItem) => {
        req.session.message = "Your post has been deleted"
        res.redirect('/home')
    })
})


module.exports = router