require('dotenv').config()
const express = require('express')
const app = express()
const {SESSION_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env
const PORT = process.env.PORT || 700;
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const appsController = require('./controllers/appsController')
const sessionsController = require('./controllers/sessionsController')
const methodOverride = require('method-override')
const mongoSanitize = require('express-mongo-sanitize');
const favicon = require('serve-favicon')
const path = require('path')





// Public Folder setup
app.use(express.static('public'))

app.use(favicon(path.join(__dirname, 'public', 'travelr.ico')))


app.use(express.urlencoded({extended:true}));
app.use(express.json())

// method-override set up
app.use(methodOverride('_method'))

//using mongo sanatize package
app.use(mongoSanitize());




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


// this will ensure req.session objects are available in all views. VERY Important to page rendering
app.use((req, res, next)=> {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    res.locals.id = req.session.id
    res.locals.author = req.session.author
    next()
})


app.use((req, res, next)=> {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})


// route hit

const routeHit = (req, res, next) => {
    console.log("route has been hit");
    next()
}

app.use(routeHit)


//setting up controllers on server
app.use('/', appsController)
app.use('/session', sessionsController)


// Custom 404 page created
app.use((req, res) => {
    res.status(404).send(res.render('404'))
})



// port setup
app.listen(PORT, ()=> {
    console.log(`Port ${PORT} is live!`)
})