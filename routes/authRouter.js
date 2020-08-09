const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();
// @desc Auth with Google
// @route GET api/v1/auth/google
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ],
//   })
// );

// this version has no email :(
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google Auth Callback
// @route GET api/v1/auth/google
// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/login',
//     successRedirect: '../../../../my-classrooms',
//   })
// );
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('made it to this redirect');
    res.redirect('/');
  }
);

// router.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   authController.login
// );
// router.get('/logout', authController.logout);

module.exports = router;
