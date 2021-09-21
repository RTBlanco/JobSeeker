const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require('../controlers/users')
const jobRouter = require('./jobs')
const {authByToken} = require('../middleware/auth')

router.post('/login', userController.login)
// router.get('/', userController.all);
// router.get('/:id', authByToken, userController.show)
router.get('/', authByToken, userController.show)
router.post('/new', userController.new)
router.patch('/', authByToken, userController.edit)
router.delete('/', userController.delete)

// nested route
router.use('/:userId/jobs', jobRouter)

module.exports = router;
