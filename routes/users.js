const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>  {
  res.send("<h1>Users</h1>");
});

module.exports = router;
