const {Schema, Types, model} = require('mongoose')

const positionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  const: {
    type: Number,
    required: true
  },
  category: {
    ref: 'categories',
    type: Types.ObjectId
  },
  user: {
    ref: 'users',
    type: Types.ObjectId
  }
})

module.exports = model('positions', positionSchema)