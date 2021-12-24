const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const User = require('../models/user')



router.get('/login', (req, res) => {
    res.render('sessions/login')
    
})

//










module.exports = router