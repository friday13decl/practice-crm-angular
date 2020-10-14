const YandexDisk = require('yandex-disk').YandexDisk
const config = require('../config')
const Category = require('../models/Category')
const Position = require('../models/Position')

const disk = new YandexDisk(config.yaDiskToken)

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({user: req.user.id})
    res.json(categories)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.json(category)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.removeById = async (req, res) => {
  try {
    const category = Category.findById(req.params.id)
    const filename = category.imageSrc
    await category.remove()
    await Position.remove({category: req.params.id})
    if (filename.length > 0) {
      await new Promise(resolve => {
        disk.remove(config.fileUploadPath + filename, err => {
          if (err) {
            res.status(500).json({message: 'Something went wrong'})
          }
          resolve()
        })
      })
    }
    res.json({message: 'Category was deleted'})
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.create = async (req, res) => {
  let filename = ''
  if (req.files && Object.keys(req.files).length > 0) {
    const image = req.files.image
    filename = new Date().getTime() + '_' + image.name
    const imageSrc = config.fileUploadPath + filename
    await new Promise(resolve => {
      disk.writeFile(imageSrc, image.data, 'utf8', (err, result) => {
        if (err) {
          res.status(500).json({message: 'Something went wrong'})
        }
        resolve()
      })
    })
  }

  try {
    const category = new Category({
      name: req.body.name,
      user: req.user.id,
      imageSrc: filename
    })
    await category.save()
    res.status(201).json(category)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.updateById = async (req, res) => {
  const updated = {
    name: req.body.name
  }

  if (req.files && Object.keys(req.files).length > 0) {
    const image = req.files.image
    const filename = new Date().getTime() + '_' + image.name
    updated.imageSrc = filename
    // upload new file and delete old one
  }

  try {
    const category = Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.json(category)
  } catch ({message}) {
    res.status(500).json({message})
  }
}