const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// PASSPORT CONFIG
require('./config/passport')(passport);

connectDB();

// ERROR HANDLING
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTE HANDLERS
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

const app = express();

// VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SESSION
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// SERVER
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err);
  // console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Starting...\nListening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
