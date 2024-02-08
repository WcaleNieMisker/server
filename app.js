var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importuj pakiet cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var elementsRouter = require('./routes/elements');
var spotifyRouter = require('./routes/spotify');

var app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/elements', elementsRouter);
app.use('/spotify', spotifyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
