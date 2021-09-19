const express = require('express');
const router = express.Router();
const InterviewRouter = require('../controlers/interviews')




router.get('/', InterviewRouter.all);
router.get('/:id', InterviewRouter.show)
router.post('/new', InterviewRouter.new)
router.patch('/:id', InterviewRouter.edit)
router.delete('/:id', InterviewRouter.delete)

// nested route


module.exports = router;