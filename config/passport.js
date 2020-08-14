const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/UserModel');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        console.log('YOU ARE IN THE PASSPORT GOOGLE STRATEGY');
        console.log(
          'Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:',
          profile
        );

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            console.log('found your fucking user');
            done(null, user);
          } else {
            console.log("couldn't find a damn person!!!");
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(
            'fucking error in in the try catch section of the google strategy'
          );
          console.error(err);
        }
      }
    )
  );

  // with works with passport-local-mongoose
  // * need User.createStrategy because we change username field to email
  passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    console.log('serializing...');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializing...');
    User.findById(id, (err, user) => done(null, user));
  });
};
