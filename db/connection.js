const mongoose = require('mongoose')

// const MONGODB_URI = process.env.MONGODB_URI
// const dbUrl = process.env.DB_URL || MONGODB_URI

mongoURI = process.env.NODE_ENV === "production" ? process.env.DB_URL : process.env.MONGODB_URI

mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))

module.exports = mongoose