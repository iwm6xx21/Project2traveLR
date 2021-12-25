require('dotenv').config()
const express = require('express')
const app = express()
const {Port, SESSION_SECRET} = process.env
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const appsController = require('./controllers/appsController')
const sessionsController = require('./controllers/sessionsController')




//middleware for session

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(express.urlencoded({extended:false}));
app.use(express.json())

// this will ensure req.session.usernam is available in all views. VERY Important to page rendering
app.use((req,res,next)=> {
    res.locals.username = req.session.username
    next()
})

// app.use(express.json())
app.use(expressLayouts)


// EJS setup
app.set('view engine', 'ejs')
// Public Folder setup
app.use(express.static('public'))

// route hit

const routeHit = (req, res, next) => {
    console.log("route has been hit");
    next()
}

app.use(routeHit)

app.use(appsController)

//setting up controllers on server
app.use('/', appsController)
app.use('/session', sessionsController)

// app.use((req, res, next)=> {
//     res.locals.message = req.session.message
//     req.session.message = ""
// })


// port setup
app.listen(Port, ()=> {
    console.log(`Port ${Port} is live!`)
})