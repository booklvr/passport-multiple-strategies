const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with Google
// @route GET /api/v1/auth/google

// MIDDLEWARE
exports.ensureAuth = (req, res, next) => {
  console.log('ENSURE AUTH MIDDLEWARE');

  // console.log('req.isAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('USER AUTHENTICATED');
    res.locals.user = req.user;
    next();
  } else {
    console.log('NOT AUTHENTICATED');
    res.redirect('/login');
    // res.status(401).json('not authenticated');
  }
};
