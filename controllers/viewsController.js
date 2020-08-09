// const User = require('../models/userModel');

exports.getLanding = (req, res) => {
  res.status(200).render('landing');
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('register', {
    title: 'Register an account',
  });
};
