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



const project1route = require("./route/project1_route")
const project2route = require("./route/project2_route")
const project3route = require("./route/project3_route")

app.use('/project1/', project1route);
app.use('/project2/', project2route);
app.use('/project3/', project3route);

app.use((req, res) => {
  res.status(200).json({ message: 'Health' });
});



/**
 * start
 */
app.listen(config.port, (err) => {
  if (!err) console.log(`[App] server running on port: ${config.port}`);
});

module.exports = app;
