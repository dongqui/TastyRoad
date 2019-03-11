const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const port = process.env.PORT || 3000
const app = express()
const mwRouting = require('./lib/mw_routing')
const cors = require('cors')
var session = require('express-session')

//CORS allowance
app.use(cors());


//static files
app.use(express.static(__dirname + '/client/build'));

//router folders
const authRoutes = require('./routes/auth-routes')

//body parsing
app.use(bodyParser.json());

//body-parser
app.use(require('body-parser'). urlencoded({ extended: true}));

//use the session middleware
app.use(session({
    secret: 'i am secret',
    resave: true,
    saveUninitialized: false
}));

//auth routes
app.use('/auth', authRoutes)

//restuarants and reviews routes
app.use('/api', mwRouting)

//handling all requests
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/im07-tasty-road-client/build/index.html')
   });

//server and mongodb connection
app.listen(port, () => {
   console.log(`Express is running on port ${port}`)
})
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
   console.log('connected to mongodb server!')
})
