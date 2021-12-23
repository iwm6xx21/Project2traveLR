const express = require('express')
const router = express.Router()


// home route - login/signup
router.get('/', (req, res)=> {
    res.render('index')
})


// app interface route

router.get('/login', (req, res) => {
    res.render('login')
})

// router.post('/login', (req, res)=> {

// })


// router.post('/register', (req, res)=> {
    
// })




module.exports = router