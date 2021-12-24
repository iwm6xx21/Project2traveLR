require('dotenv').config()
const express = require('express')
const app = express()
const {Port, SESSION_SECRET} = process.env
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const appsController = require('./controllers/appsController')
const sessionController = require('./controllers/sessionsController')




//middleware for session

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// this will ensure req.session.usernam is available in all views. VERY Important to page rendering
app.use((req,res,next)=> {
    res.locals.username = req.session.username
    next()
})

// Public Folder setup
app.use(express.static('public'))

// route hit

const routeHit = (req, res, next) => {
    console.log("route has been hit");
    next()
}

app.use(routeHit)

app.use(express.urlencoded({extended:false}));
// app.use(express.json())
app.use(expressLayouts)

// EJS setup
app.set('view engine', 'ejs')


// app.use((req, res, next) => {
//     res.locals.username = req.session.username
//     res.locals.loggedIn = req.session.loggedIn
//     // res.locals is the equivalent of the object that you pass to res.render
//     // this means that in all views, req.session.username will be available
//     // as the local variable username
//     next()

// })

// sessions middleware function







//setting up controllers on sever
app.use('/', appsController)
app.use('/home', sessionController)




// port setup
app.listen(Port, ()=> {
    console.log(`Port ${Port} is live!`)
})