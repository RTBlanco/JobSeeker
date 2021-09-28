const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require('../controlers/users')
const jobRouter = require('./jobs')
const {authByToken} = require('../middleware/auth')

router.post('/login', userController.login)
router.post('/new', userController.new)
router.get('/', authByToken, userController.show)
router.patch('/', authByToken, userController.edit)
router.delete('/',authByToken, userController.delete)

module.exports = router;
