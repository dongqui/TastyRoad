const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
console.log(process.env.NODE_ENV);
const config = process.env.NODE_ENV === 'production' ? require('./envConfig') : require('./config');
const port = process.env.PORT || 3000;
const app = express();
const restaurantRoutes = require('./routes/restaurantHandler');
const authRoutes = require('./routes/authHandler');
const reviewRoutes = require('./routes/reviewHandler');
const cors = require('cors');
const session = require('express-session');
const logger = require('morgan');

app.use(cors());
app.use(logger());
app.use(express.static(__dirname + '/client/build'));
app.use(bodyParser.json());
app.use(require('body-parser'). urlencoded({ extended: true}));
app.use(session({
    secret: config.session,
    resave: true,
    saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/review', reviewRoutes);

app.listen(port, () => {
   console.log(`Express is running on port ${port}`)
});

mongoose.connect(config.db.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
   console.log('connected to mongodb server!')
});
