const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with Google
// @route GET /api/v1/auth/google

// MIDDLEWARE
exports.ensureAuth = (req, res, next) => {
  console.log('ENSURE AUTH MIDDLEWARE');
  console.log('session', req.session);
  // console.log('req.isAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log(req);
    console.log('is authenticated');
    next();
  } else {
    console.log('is not authenticated');
    console.log('fuck you try and login again');
    res.redirect('/login');
    // res.status(401).json('not authenticated');
  }
};
