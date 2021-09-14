const express = require('express');
const router = express.Router();
const userController = require('../controlers/users')

router.get('/', userController.all);
router.get('/:id', userController.show)
router.get('/new', userController.new)
router.patch('/:id', userController.edit)
router.delete('/:id', userController.delete)


module.exports = router;
