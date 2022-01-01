module.exports.authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        req.session.returnTo = req.originalUrl
        req.session.message = "Please log in or sign up to access this action"
        return res.redirect('/')
    }
}