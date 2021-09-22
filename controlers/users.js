const { User, Job } = require('../models');

const {sign, decode} = require('../utils/jwt')

const userController = {

  async login (req, res) {
    console.log(req.body)
    try {
      const user = await User.findOne({where: {email: req.body.email}})
      if (!user) {
        throw new Error("User not found")
      }  

      if (await user.isValid(req.body.password)) {
        const token = await sign(user)
        res.json({...user.dataValues, token})
      } else {
        throw new Error(" Incorrect email or password")
      }

    } catch (e) {
      res.status(404).json({
        error: e.message
      })
    }
  },

  async show (req, res) {
    console.log(req.user)
    try {
      const user = await User.findByPk(req.user.id, {include: {all: true, nested: true}})
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
      const token = await sign(user)
      res.json({...user.dataValues, token})

    } catch(e){

      if (!e.errors) {
        res.status(422).json({
          error: e.message
        })
      } else {
        console.log("here =>", e)
        const errors = e.errors.map(er => er.message)
        res.status(422).json({
          errors: {body: [errors]}
        })
      }
    }
  },

  async edit (req, res) {
    try {
      const user = await User.findByPk(req.user.id)
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
      const user = await User.findByPk(req.user.id)
      if (!user){
        throw new Error('No such user found')
      }
      await user.destroy()
      res.json(user)

    } catch(e) {
      return res.status(404).json({
        error: e.message
      })
    }
  }
};

module.exports = userController;