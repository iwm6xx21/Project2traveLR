require('dotenv').config()
const express = require('express')
const app = express()
const {Port, SESSION_SECRET} = process.env
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const appsController = require('./controllers/appsController')
const sessionsController = require('./controllers/sessionsController')
const methodOverride = require('method-override')




// Public Folder setup
app.use(express.static('public'))

// method-override set up
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:false}));
app.use(express.json())


//express layout setup
app.use(expressLayouts)

// EJS setup
app.set('view engine', 'ejs')

//middleware for session

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))


// this will ensure req.session.username is available in all views. VERY Important to page rendering
app.use((req, res, next)=> {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})


app.use((req, res, next)=> {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        // if the user is logged in, resolve the route
        next()
    } else {
        // otherwise redirect them to the log in page
        res.redirect('/session')
    }
}


// route hit

const routeHit = (req, res, next) => {
    console.log("route has been hit");
    next()
}

app.use(routeHit)

//setting up controllers on server
app.use('/', appsController)
app.use('/session', sessionsController)

// port setup
app.listen(Port, ()=> {
    console.log(`Port ${Port} is live!`)
})