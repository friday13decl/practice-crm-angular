const express = require('express')
const passport = require('passport')
const YandexDisk = require('yandex-disk').YandexDisk
const config = require('config')
const mimeTypes = require('mime-types')

const router = express.Router()
const disk = new YandexDisk(config.get('yaDiskToken'))
const middleware = [
  passport.authenticate('jwt', {session: false})
]

router.get('/image/:filename',async (req, res) => {
  const imageSrc = config.get('fileUploadPath') + req.params.filename
  res.set('Content-Type', mimeTypes.contentType(req.params.filename).toString())
  disk.readFile(imageSrc, res, (err) => {
    if (err) {
      res.status(500).json({message: 'Something went wrong'})
    }
  })
})

module.exports = router

