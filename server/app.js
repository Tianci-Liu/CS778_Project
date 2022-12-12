const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express(),
  config = require('./config');

const error = require('./middlewares/error'),
  logger = require('./middlewares/logger');

/**
 * mongondb
 */
mongoose
  .connect(config.database.local, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      // console.log('[App] MongoDB connected success.');
    },
    (err) => {
      console.log(err);
      // console.log('[App] MongoDB connected fail.');
    }
  );

app.use(cors());
app.use(cookieParser());
// Error Handle
app.use(error());
// Logger
app.use(logger());

/**
 * static files
 */
app.use(express.static(__dirname + '/public'));

/**
 * HTTP body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * routes register
 */
app.use('/api/user', UserRoute);
// upload image

app.use('/api/images/',uploadImage)


// article routes

app.use('/api/article/',articleRoute)



app.use((req, res) => {
  res.status(200).json({ message: 'Hello World' });
});



/**
 * start
 */
app.listen(config.port, (err) => {
  if (!err) console.log(`[App] server running on port: ${config.port}`);
});

module.exports = app;
