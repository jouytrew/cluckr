const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const posting = require('./routes/posting');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
  response.locals.username = null;
  const username = request.cookies.username;
  console.log(request.cookies);
  if (username) {
    response.locals.username = username;
  }
  next();
});

app.use('/', index);
app.use('/posting', posting);

module.exports = app;

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listening on http://${DOMAIN}:${PORT}`);
});
