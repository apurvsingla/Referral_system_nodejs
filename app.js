const  createError = require('http-errors');
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');

const  indexRouter = require('./routes/index');
const  usersRouter = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const db = require('./Config/mongoose');
const  app = express();

//passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./Config/passport-local-strategy');
const passportJWT = require('./Config/passport-jwt-strategy');


//mongo
const MongoStore = require('connect-mongo')(session);

// view engine setup
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
  name: 'random',

  secret: 'sadasnldasd2a5d',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore({
      mongooseConnection: db,
      autoRemove: 'disabled'
  }),
  function(err) {
      console.log(err || 'connect-mongodb setup ok');
  }
}));

app.use(express.static('./assets'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.checkAuthentication);
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
