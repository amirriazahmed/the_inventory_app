const express = require('express');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')
const bcrypt = require('bcryptjs');


const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("abcdef", salt);
console.log('this is the hash password:',hash);

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
        }, 

  function(email, password, done) {
    console.log('Trying to check user: ' + email + ' with password ' + password)
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      console.log('Found the user', user)
      if (!user) {
        return done(null, false, { message: 'Incorrect user email.' });
      }
      bcrypt.compare(password, user.password).then((res) => {
        if (res === false) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('Returning user from authenticate check!')
          return done(null, user);
    });

     /*  if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('Returning user from authenticate check!')
      return done(null, user); */
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('Serializing user id into cookie ', user._id)
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    console.log('Deserialing user from id in cookie ', id)
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

const router = express.Router();
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('request user: auth js ',req.user)
  let user = req.user
  res.send({_id: user._id, email: user.email })
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = {
    passport,
    router
}