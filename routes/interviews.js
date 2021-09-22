const express = require('express');
const router = express.Router({mergeParams: true});
const InterviewRouter = require('../controlers/interviews')
const {authByToken} = require('../middleware/auth')

router.get('/', authByToken, InterviewRouter.all);
router.get('/:id', authByToken, InterviewRouter.show)
router.post('/new', authByToken, InterviewRouter.new)
router.patch('/:id', authByToken, InterviewRouter.edit)
router.delete('/:id', authByToken, InterviewRouter.delete)


module.exports = router;