const express = require('express')
const passport = require('passport')

const controller = require('./../controllers/analytics')

const router = express.Router()
const middleware = [
  passport.authenticate('jwt', {session: false})
]

router.get('/overview', middleware, controller.overview)
router.get('/analytics', middleware, controller.analytics)

module.exports = router