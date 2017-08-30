'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storageSchema = mongoose.Schema({
    uploaded_date: { type: Date, default: new Date() },
    user: { type: Schema.ObjectId, ref: 'User' },
    filename: String,
    mimetype: String,
    size: Number,
    url: String,
    key: String,
    dl_count: { type: Number, default: 0 }
})

var Storage = mongoose.model('Storage', storageSchema)

module.exports = Storage
