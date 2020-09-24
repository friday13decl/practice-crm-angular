const express = require('express')
const controller = require('./../controllers/category')
const passport = require('passport')

const router = express.Router()
const jwtAuthMiddleware = passport.authenticate('jwt', {session: false})

router.get('/', jwtAuthMiddleware, controller.getAll)
router.get('/:id', jwtAuthMiddleware, controller.getById)
router.post('/create', controller.create)
router.patch('/:id', controller.updateById)
router.delete('/:id', controller.removeById)

module.exports = router