const users = require('../models/User');
const random = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.signup = (req, res) => {
  let secret = random.randStr(8);
  users.create({
    name: req.body.name,
    username: req.body.username,
    password: random.hash(req.body.password, secret),
    email: req.body.email,
    secretKey: secret
  })
  .then(user => {
      res.json(user);
  })
}

exports.signin = (req, res) => {
  users.findOne({
    username: req.body.username
  })
  .then(user => {
    pass = random.hash(req.body.password, user.secretKey);
    if (pass == user.password) {
      jwt.sign({
        userId : user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
      }, process.env.APP_SECRET, (err, token) => {
        if (err) throw err
        res.json(token)
      });
    } else {
      res.send('wrong password')
    }
  })
  .catch(err => res.send('username doesn\'t exist'))
}
