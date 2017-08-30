'use strict'

var mongoose = require('mongoose')

var storageSchema = mongoose.Schema({
    uploaded_date: { type: Date, default: new Date() },
    user: { type: Schema.ObjectId, ref: 'User' },
    filename: String,
    extension: String,
    size: Number,
    url: String,
    key: String
})

var Storage = mongoose.model('Storage', storageSchema)

module.exports = Storage
