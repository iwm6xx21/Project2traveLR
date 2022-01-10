const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comments')
const {authRequired} = require('../middleware')
const {authRequiredDelete} = require('../middleware')
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken})



// login and sign up route
router.get('/', (req, res)=> {
    
        res.render('login')
    })

// route to picture upload form. Must be logged in access. 

router.get('/new', authRequired, (req, res)=> {
    
    res.render('new')
})

// route to post new picture upload data to database. Must be logged in to access. 
router.post('/home',upload.array('img'),async (req,res, next) => {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.post.location,
            limit: 1
        }).send()
        const user = await User.find({username: req.body.author})
        req.body.post.author = user[0]._id
        const posts = new Post(req.body.post);
        posts.geometry = geoData.body.features[0].geometry;
        posts.img = req.files.map(f => ({url: f.path, filename: f.filename}))
        await posts.save();
        // console.log(posts)
        const postedBy = req.session.username
        req.session.message = `Hey ${postedBy}, your adventure has been posted!`
        res.redirect('/home')
            
    });



// route to obtain new post data from database and render them to the home page
router.get('/home', async (req, res)=> {
    const posts = await Post.find({});
        res.render('home', {posts})
})



// route hit once user has either logged in to an existing account or registered for a new account
router.get('/home', (req, res) => {
    res.render('home')
    
})


// show route for handeling posts 
router.get('/home/:id', (async(req, res,) => {
    const posts = await Post.findById(req.params.id).populate('comments').populate('author');
    res.render('show', {posts})

}))

// post comments route on show page
router.post('/home/:id/comments', authRequiredDelete, async (req, res)=> {
   const posts = await Post.findById(req.params.id);
//    const user = await User.find({username: req.body.author}) // needs work on input
//    console.log(user)
//    req.body.comment.author = user[0]._id
   const comment = new Comment(req.body)
   console.log(comment)
   posts.comments.push(comment) 
    await comment.save();
    await posts.save();
    res.redirect(`/home/${posts._id}`);
})

// delete route for comments 

router.delete('/home/:id/comments/:commentId', authRequiredDelete, async (req, res)=> {
    const {id, commentId} = req.params;
    await Post.findByIdAndUpdate(id, {$pull:{comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/home/${id}`)
})


// route to edit form. Must be logged in to access. 
router.get('/home/:id/edit', authRequired,(req, res)=> {
    Post.findById(req.params.id, (err, posts) => {
        res.render('edit', {posts})
    }) 
})

// post edits to database then redirect to the home page. Must be logged in to access. 

router.put('/:id', authRequired, upload.array('img'), async(req, res) => {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    posts.img.push(...imgs)
    await posts.save()
    if(req.body.deleteImages) {
        await posts.updateOne({ $pull: {img:{ filename:{ $in: req.body.deleteImages}}}})
    }
    res.redirect('/home')
})

// route to delete posted item. Must be logged in to access. 

router.delete('/:id', authRequiredDelete, (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, deletedItem) => {
        req.session.message = "Your post has been deleted"
        res.redirect('/home')
    })
})

// cluster map that illustrates all locations users have visited

router.get('/cluster', async (req, res) => {
    const posts = await Post.find({});
    res.render('mapCluster', ({posts}))
})



module.exports = router