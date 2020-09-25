const {Schema, Types, model} = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Types.ObjectId
  }
})

module.exports = model('categories', categorySchema)