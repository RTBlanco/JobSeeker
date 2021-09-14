const express = require('express');
const router = express.Router({mergeParams: true});
const jobsController = require('../controlers/jobs')

router.get('/', jobsController.all);
router.get('/:id', jobsController.show)
router.get('/new', jobsController.new)
router.patch('/:id', jobsController.edit)
router.delete('/:id', jobsController.delete)


module.exports = router;
