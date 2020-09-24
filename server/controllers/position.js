const Position = require('../models/Position')

module.exports.getByCategoryId = async (req, res) => {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id
    })
    res.json(positions)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.create = async (req, res) => {
  try {
    const position = await Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save()
    res.status(200).json(position)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.updateById = async (req, res) => {
  try {
    const position = await Position.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.json(position)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.removeById = async (req, res) => {
  try {
    await Position.remove({_id: req.params.id})
    res.json({message: 'Position was deleted'})
  } catch ({message}) {
    res.status(500).json({message})
  }
}