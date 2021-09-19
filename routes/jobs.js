const express = require('express');
const router = express.Router({mergeParams: true});
const jobsController = require('../controlers/jobs')
const interviewRouter = require('./interviews')

router.get('/', jobsController.all);
router.get('/:id', jobsController.show)
router.post('/new', jobsController.new)
router.patch('/:id', jobsController.edit)
router.delete('/:id', jobsController.delete)

router.use('/:jobId/interviews', interviewRouter)


module.exports = router;
