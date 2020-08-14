const passport = require('passport');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const AppError = require('../utils/appError');

exports.register = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    password,
    passwordConfirm,
  } = req.body;

  // ERROR HANDLING
  // * missing fields
  if (
    !firstName ||
    !lastName ||
    !displayName ||
    !email ||
    !password ||
    !passwordConfirm
  ) {
    return next(new AppError('Please fill in all fields', 400));
  }

  // * passwords do not match
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 401));
  }

  // CREATE NEW USER
  const user = new User({
    firstName,
    lastName,
    displayName,
    email,
  });

  // TO DO add ERROR HANDLING HERE

  User.register(user, password, (err) => {
    console.log('registering user: User.registers');
    if (err) {
      console.log(err);
      return next(new AppError('Could not register new user', 500));
    }
    console.log('trying to authenticate with passport');

    passport.authenticate('local')(req, res, function () {
      console.log('redirect to classroom');

      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    });
  });
});
