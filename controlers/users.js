const User = require('../models/User')

const userController = {
  async all (req, res) {
    const users = await User.findAll();
    res.send(users)
  },
  
  async show (req, res) {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  }, 

  new (req, res) {

    // res.send()
  },

  edit (req, res) {
    res.send(`<h1> this route is use to edit the with ${req.params.id}`)
  },

  delete (req, res) {
    res.send(`this will delete the use with ${req.params.id}`)
  }
};

module.exports = userController;