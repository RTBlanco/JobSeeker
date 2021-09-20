const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require('../controlers/users')
const jobRouter = require('./jobs')
const {authByToken} = require('../middleware/auth')

router.post('/login', userController.login)
router.get('/', userController.all);
router.get('/:id', authByToken, userController.show)
router.post('/new', userController.new)
router.patch('/:id', userController.edit)
router.delete('/:id', userController.delete)

// nested route
router.use('/:userId/jobs', jobRouter)

module.exports = router;
