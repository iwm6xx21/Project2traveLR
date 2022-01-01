const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comments')
const {authRequired} = require('../middleware')
// const { require } = require('find-config')


// login and sign up route
router.get('/', (req, res)=> {
    
        res.render('login')
    })

// route to picture upload form. Must be logged in access. 

router.get('/new', authRequired, (req, res)=> {
    
    res.render('new')
})

// route to post new picture upload data to database. Must be logged in access. 
router.post('/home', (req,res, next) => {
    Post.create(req.body, (err, posts) => {
        const poster = req.body.location
        console.log(poster)
        const postedBy = req.session.username
        req.session.message = `${postedBy} your adventure has been posted!`
        res.redirect('/home')
            
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


// show route for handlining posts 
router.get('/home/:id', (async(req, res) => {
    const posts = await Post.findById(req.params.id).populate('author'); 
    console.log(posts)
    res.render('show', {posts})

}))

// post comments router on show page
router.post('/home/:id/comments', authRequired, async (req, res)=> {
   const posts = await Post.findById(req.params.id);
   const comment = new Comment(req.body)
   posts.comments.push(comment)
    await comment.save();
    await posts.save();
    res.redirect(`/home/${posts._id}`);
})


// route to edit form. Must be logged in access. 
router.get('/home/:id/edit', authRequired,(req, res)=> {
    Post.findById(req.params.id, (err, posts) => {
        res.render('edit', {posts})
    }) 
})

// post edits to database then redirect to the home page. Must be logged in access. 

router.put('/:id', authRequired, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedpost) =>{
        res.redirect('/home')
    })
})

// route to delete posted item. Must be logged in access. 

router.delete('/:id', authRequired, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, deletedItem) => {
        req.session.message = "Your post has been deleted"
        res.redirect('/home')
    })
})





module.exports = router