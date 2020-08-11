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

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/',
//   }),
//   (req, res) => {
//     console.log('req.user', req.user);
//     console.log('req.body.user', req.body.user);
//     console.dir('Req body: ', JSON.stringify(req.body));
//     console.log('\n\nReq session: ', JSON.stringify(req.session));
//     res.redirect('/');

//     // req.session.save(() => {
//     //   console.log('session', req.session);
//     //   console.log('try redirecting');
//     //   res.render('profile');
//     // });
//   }
// );

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// router.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   authController.login
// );
// router.get('/logout', authController.logout);

module.exports = router;
