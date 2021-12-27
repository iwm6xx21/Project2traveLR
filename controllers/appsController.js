const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')



// ensure user is logged in before having access to forms that will change posted data

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
       
        res.redirect('/')
    }
}




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
        res.redirect('/home' )
    })
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
router.get('/home/:id/edit', authRequired, (req, res)=> {
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
        res.redirect('/home')
    })
})



module.exports = router