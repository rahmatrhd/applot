'use strict'

var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    fullname: String,
    username: {type: String, unique: true, required: true},
    password: {type: String, required:true},
    secretKey: String
})

var User = mongoose.model('User', userSchema)

module.exports = User
