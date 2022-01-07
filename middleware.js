module.exports.authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        
        req.session.message = "Please log in or sign up to access this action"
        req.session.returnTo = req.originalUrl
        console.log(req.originalUrl)
        return res.redirect('/')
    } 
}


// The delete action is not a route. The below middleware is specifically for the authorization for the delete action. 

module.exports.authRequiredDelete = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        
        req.session.message = "Please log in or sign up to access this action"
        return res.redirect('/')
    } 
}