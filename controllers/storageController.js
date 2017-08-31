const Storage = require('../models/Storage')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: 'applot-storage'
  }
});

module.exports = {
  getFiles: (req, res) => {
    jwt.verify(req.headers.accesstoken, process.env.APP_SECRET, (err, user) => {
      if (err) res.send(err)
      else
        Storage.find({
          user: user.userId
        })
        .then(result => res.send(result))
        .catch(err => res.send(err))
    })
  },

  uploadFile: (req, res) => {
    jwt.verify(req.headers.accesstoken, process.env.APP_SECRET, (err, user) => {
      if (err) res.send(err)
      else {
        let uploads = req.files.map(file => {
          return new Promise((resolve, reject) => {
            let unique = new Date()
            s3.upload({
              Key: `${unique.getTime()}&_${file.size}&_${file.originalname}`,
              Body: file.buffer,
              ACL: 'public-read'
            }, function(err, data) {
              if (err) reject(err)
              else {
                Storage.create({
                  user: user.userId,
                  filename: file.originalname,
                  mimetype: file.mimetype,
                  size: file.size,
                  url: data.Location,
                  key: data.key
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
              }
            })
          })
        })

        Promise.all(uploads)
        .then(uploaded => res.send(uploaded))
        .catch(err => res.send(err))
      }
    })
  },

  deleteFile: (req, res) => {

    jwt.verify(req.headers.accesstoken, process.env.APP_SECRET, (err, user) => {
      s3.deleteObject({
        Key: req.body.fileKey
      }, (err, data) => {
        if (err) res.send(err)
        else
          Storage.deleteOne({
            user: user.userId,
            key: req.body.fileKey
          })
          .then(result => res.send(result))
          .catch(err => res.send(err))
      })
    })
  }
}
