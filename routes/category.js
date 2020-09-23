const express = require('express')
const controller = require('./../controllers/category')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/create', controller.create)
router.patch('/:id', controller.updateById)
router.delete('/:id', controller.removeById)

module.exports = router