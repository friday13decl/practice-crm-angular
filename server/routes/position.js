const express = require('express')
const passport = require('passport')

const controller = require('./../controllers/position')

const router = express.Router()
const middleware = [
  passport.authenticate('jwt', {session: false})
]

router.get('/:categoryId', middleware, controller.getByCategoryId)
router.post('/', middleware, controller.create)
router.patch('/:id', middleware, controller.updateById)
router.delete('/:id', middleware, controller.removeById)

module.exports = router