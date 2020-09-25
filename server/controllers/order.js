const Order = require('../models/Order')

module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id
  }

  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.json(orders)
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order
      .findOne({user: req.user.id})
      .sort({order: -1})

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: lastOrder ? lastOrder.order + 1 : 1
    }).save()

    res.status(201).json(order)
  } catch ({message}) {
    res.status(500).json({message})
  }
}