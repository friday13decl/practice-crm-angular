const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports.login = (req, res) => {

}

module.exports.register = async (req, res) => {
  const {email, password} = req.body

  const candidate = await User.findOne({email})

  if (candidate) {
    res.status(409).json({
      message: 'This email is already registered'
    })
  } else {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({email, password: hashedPassword})

    try {
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong', error
      })
    }
  }
}