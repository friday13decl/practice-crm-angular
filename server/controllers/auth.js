const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require('express-validator')

const User = require('../models/User')

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong data format'
      })
    }

    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      res.status(404).json({
        message: 'User with such email is not found'
      })
    } else {
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Wrong login or password'
        })
      } else {
        const token = jwt.sign({
          email: user.email,
          userId: user._id
        }, config.get('jwtSecret'), {
          expiresIn: '1h'
        })
        res.json({token: `Bearer ${token}`})
      }
    }
  } catch ({message}) {
    res.status(500).json({message})
  }
}

module.exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong data format'
      })
    }

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
  } catch ({message}) {
    res.status(500).json({message})
  }
}