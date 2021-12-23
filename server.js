const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const Port = 700
const appsController = require('./controllers/appsController')

// EJS setup
app.set('view engine', 'ejs')

// Public Folder setup
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(expressLayouts)





//setting up controllers on sever
app.use('/', appsController)




// port setup
app.listen(Port, ()=> {
    console.log(`Port ${Port} is live!`)
})