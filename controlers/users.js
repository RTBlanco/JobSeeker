const User = require('../models/User');

const userController = {
  
  async all (req, res) {
    const users = await User.findAll();
    res.send(users)
  },
  
  async show (req, res) {
    try {

      const user = await User.findByPk(req.params.id)
      if (!user){
        throw new Error('No such user found')
      }
      res.json(user)

    } catch(e){

      return res.status(404).json({
        error: e.message
      })
    }
  }, 

  async new (req, res) {
    const data = {...req.body}

    try {

      const user = await User.create(data)
      console.log(user)
      res.json(user)

    } catch(e){

      const errors = e.errors.map(er => er.message)
      return res.status(422).json({
        errors: {body: [errors]}
      })
    }
  },

  async edit (req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user){
        throw new Error('No such user found')
      }

      if (req.body) {
        const name = req.body.name ? req.body.name : user.name
        const email = req.body.email ? req.body.email : user.email 
        const password = req.body.password ? req.body.password : user.password 

        const updatedUser = await user.update({name, email, password})
        res.json(updatedUser)
      } else {
        res.json(user)
      }

    } catch(e) {
      const status = res.statusCode ? res.statusCode : 500
      return res.status(status).json({
        errors: { body: [ e.message ] }
      })
    }

  },

  async delete (req, res) {
    try {
      
      const user = await User.findByPk(req.params.id)
      if (!user){
        throw new Error('No such user found')
      }
      user.destroy()
      res.json(user)

    } catch(e) {
      return res.status(404).json({
        error: e.message
      })
    }
  }
};

module.exports = userController;