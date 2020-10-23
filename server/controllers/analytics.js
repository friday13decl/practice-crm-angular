const moment = require('moment')
const Order = require('../models/Order')

module.exports.overview = async (req, res) => {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1,'d').format('DD.MM.YYYY')] || []
    const totalOrdersNumber = allOrders.length
    const yesterdayOrdersNumber = yesterdayOrders.length
    const daysNumber = Object.keys(ordersMap).length
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)

    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)

    const totalGain = calculatePrice(allOrders)
    const gainPerDay = totalGain / daysNumber

    const yesterdayGain = calculatePrice(yesterdayOrders)

    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)

    const gainComparison = (yesterdayGain - gainPerDay).toFixed(2)
    const ordersNumberComparison = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

    res.json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+gainComparison),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+ordersNumberComparison),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })
  } catch ({message}) {
    res.status(500).json({message})
  }

}

module.exports.analytics = (req, res) => {

}

function getOrdersMap(orders = []) {
  const daysOrder = []
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')
    if (date === moment().format('DD.MM.YYYY')) {
      return
    }
    if (!daysOrder[date]) {
      daysOrder[date] = []
    }
    daysOrder[date].push(order)
  })
  return daysOrder
}

function calculatePrice(orders = []) {
  return orders.reduce((acc, order) => {
    return acc += order.list.reduce((total, item) => {
      return total += item.cost * item.quantity
    }, 0)
  }, 0)
}