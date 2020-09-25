const express = require('express')
const passport = require('passport')

const controller = require('./../controllers/category')

const router = express.Router()
const middleware = [
  passport.authenticate('jwt', {session: false})
]

router.get('/', middleware, controller.getAll)
router.get('/:id', middleware, controller.getById)
router.post('/', middleware, controller.create)
router.patch('/:id', middleware, controller.updateById)
router.delete('/:id', middleware, controller.removeById)

module.exports = router