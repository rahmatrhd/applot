const express = require('express')
const router = express.Router()
const storageController = require('../controllers/storageController')
const multer = require('multer')
const upload = multer()

router.get('/', storageController.getFiles)
router.post('/', upload.array('file'), storageController.uploadFile)
router.post('/delete', storageController.deleteFile)

module.exports = router
