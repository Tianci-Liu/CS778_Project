const express = require('express'),
bodyParser = require('body-parser');
//mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
//config = require('./config');
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3001;
const path = require('path');

process.env.NODE_ENV = 'production';
console.log('env', process.env.NODE_ENV);

const error = require('./middlewares/error'),
logger = require('./middlewares/logger');

/**
 * mongondb
 
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

*/

app.use(cors());
app.use(cookieParser());
// Error Handle
app.use(error());
// Logger
app.use(logger());

/**
 * static files
 */
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}


/**
 * HTTP body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const project1route = require("./route/project1_route")
const project2route = require("./route/project2_route")
const project3route = require("./route/project3_route")

app.use('/api/project1/', project1route);
app.use('/api/project2/', project2route);
app.use('/api/project3/', project3route);

app.use((req, res) => {
  res.status(200).json({ message: 'Health' });
});



/**
 * start
 */
http.listen(PORT, (err) => {
  if (!err) console.log(`[App] server running on port: ${PORT}`);
});
