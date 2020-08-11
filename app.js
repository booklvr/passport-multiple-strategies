const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

// LOAD CONFIG
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

// PASSPORT CONFIG
require('./config/passport')(passport);

connectDB();

// ERROR HANDLING
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// COOKIE PARSER
app.use(cookieParser());
// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SESSION
app.use(
  session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

console.log('mongoose.connection', mongoose.connection);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Implement CORS
// Access-Control-Allow-Origin header
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// ROUTE HANDLERS
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

// SERVER
// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION!  Shutting down...');
//   console.log(err);
//   // console.log(err.name, err.message);
//   process.exit(1);
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Starting...\nListening on port ${port}`);
});

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION!  Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
