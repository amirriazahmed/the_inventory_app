var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// IMPORT ROUTES
var auth = require('./routes/auth');
var indexRouter = require('./routes/index');
var superheroRouter = require('./routes/superhero');
var productRouter = require('./routes/product');

// SETUP MONGO/MONGOOSE
const mongoose = require('mongoose');
const mongoUser = 'inventoryAknots';
const mongoPasswd = 'Aknots2021';
const mongoDBName = 'AknotsDataBase';
const mongoServer = 'inventoryd.ro5pk.mongodb.net';
const url =
  `mongodb+srv://${mongoUser}:${mongoPasswd}` +
  `@${mongoServer}/${mongoDBName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', (_) =>
  console.log('MongoDB is now connected:', `${mongoUser}@${mongoServer}/${mongoDBName}`)
);
db.on('error', (err) => console.error('MongoDB connection error!', err));

const onlyAllowedURLnonAuth = ['/auth/login'];


/* const authenticationMiddleware = (whiteList =[]) => (req, res, next) => {
  console.log('test middleware',req.path);
    if(whiteList.find(req.path)) {
      next();
    }

    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/');
}
 */
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: "aknots" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(authenticationMiddleware(allowUrl));

function ensureAuthenticated(req, res, next) {
  //below two lines checked to see if logged in remove return if 64 65 on
 /*  if (req.isAuthenticated()) { return next(); }
  res.redirect('/') */
  return next();
}

app.all('*', function(req,res,next){
  console.log('ensure login path',req.path)
  if (onlyAllowedURLnonAuth.includes(req.path))
  next();
  else
  ensureAuthenticated(req,res,next);  
});


// USE ROUTES
app.use('/', indexRouter);
app.use('/superhero', superheroRouter);
app.use('/product', productRouter);
app.use('/auth', auth.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
