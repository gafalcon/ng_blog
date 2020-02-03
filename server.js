require('dotenv').config()
const webpush = require('web-push')

//Required libs
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')
//DB config
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(cors())
webpush.setVapidDetails('mailto:gabofalc@gmail.com', process.env.PUBLIC_VAPID, process.env.PRIVATE_VAPID)
//Server configs
app.use(morgan('tiny'))
app.use(express.json()) //Convert reqs to json

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/blog')));



// Routing
const user_router = require('./server/routes/user.route')
const post_router = require('./server/routes/post.route')
app.use('/api/users', user_router)
app.use('/api/posts', post_router)



// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/blog/index.html'));
});


/*
 * Get port from env and store in Express.
 */
const port = process.env.PORT || '3000';

app.listen(port, () => console.log('server started'))
