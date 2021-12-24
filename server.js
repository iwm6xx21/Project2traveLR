require('dotenv').config()
const express = require('express')
const app = express()
const {Port, SESSION_SECRET} = process.env
const expressLayouts = require('express-ejs-layouts')
const appsController = require('./controllers/appsController')
const sessionController = require('./controllers/sessionsController')


// Public Folder setup
app.use(express.static('public'))

// route hit

const routeHit = (req, res, next) => {
    console.log("route has been hit")
}

app.use(express.urlencoded({extended:false}));

// EJS setup
app.set('view engine', 'ejs')

// sessions middleware function

const session = require('express-session')






app.use(express.json())
app.use(expressLayouts)


app.use((req,res,next)=> {
    // res.locals.username = req.session.username
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))



//setting up controllers on sever
app.use('/login', appsController)
app.use('/home', sessionController)




// port setup
app.listen(Port, ()=> {
    console.log(`Port ${Port} is live!`)
})