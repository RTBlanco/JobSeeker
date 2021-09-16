const express = require('express');
const router = express.Router();
const userController = require('../controlers/users')
const jobRouter = require('./jobs')



router.get('/', userController.all);
router.get('/:id', userController.show)
router.post('/new', userController.new)
router.patch('/:id', userController.edit)
router.delete('/:id', userController.delete)

// nested route
router.use('/:userId/jobs', jobRouter)

module.exports = router;
