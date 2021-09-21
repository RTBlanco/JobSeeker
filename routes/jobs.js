const express = require('express');
const router = express.Router({mergeParams: true});
const jobsController = require('../controlers/jobs')
const interviewRouter = require('./interviews')
const {authByToken} = require('../middleware/auth')

router.get('/', authByToken, jobsController.all);
router.get('/:id', authByToken, jobsController.show)
router.post('/new', authByToken, jobsController.new)
router.patch('/:id', authByToken, jobsController.edit)
router.delete('/:id', authByToken, jobsController.delete)

router.use('/:jobId/interviews', interviewRouter)


module.exports = router;
