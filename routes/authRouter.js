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
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log('GOOGLE CALLBACK');
    console.log('session', req.session.passport.user);
    console.log('req.isAuthenticated', req.isAuthenticated());
    console.log('req.isAuthenticated2', req.isAuthenticated());

    req.session.save(() => {
      console.log('session', req.session);
      console.log('try redirecting');
      res.redirect('/profile');
    });
  }
);

// const redirects = {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
// };

// router.get(
//   '/google/callback',
//   passport.authenticate('google', redirects),
//   function (req, res) {
//     console.log('FUCK FUCK FUCK FUCK FUCK');
//     // Explicitly save the session before redirecting!
//     console.log(req.session);
//     req.session.save(() => {
//       res.redirect('/profile');
//     });
//   }
// );

// router.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   authController.login
// );
// router.get('/logout', authController.logout);

module.exports = router;
