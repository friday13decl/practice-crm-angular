const express = require('express')
const passport = require('passport')

const controller = require('./../controllers/order')

const router = express.Router()
const middleware = [
  passport.authenticate('jwt', {session: false})
]

router.get('/', middleware, controller.getAll)
router.post('/', middleware, controller.create)

module.exports = router