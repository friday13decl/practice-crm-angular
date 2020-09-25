const express = require('express')
const {check} = require('express-validator')

const controller = require('./../controllers/auth')

const router = express.Router()
const middleware = [
  check('email', 'Wrong email format').isEmail(),
  check('password', 'Wrong password format').isLength({min: 6})
]

router.post('/login', middleware, controller.login)
router.post('/register', middleware, controller.register)

module.exports = router