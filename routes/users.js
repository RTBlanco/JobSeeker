const express = require('express');
const router = express.Router();
const userController = require('../controlers/users')

/* GET home page. */
router.get('/', userController.all);

router.get('/:id', (req, res) => {
  res.send(`route is info for ${req.params.id}`)
})

router.get('/new', (req, res) => {
  res.send(`create a new user`)
})

router.patch('/:id', (req, res) => {
  res.send(`route is for editing ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`router is for deleting ${req.params.id}`)
})

module.exports = router;
