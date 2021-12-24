const express = require('express')
const bycrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()


router.get('/sessions', (req, res) => {
    res.send('Session controller works')
})












module.exports = router