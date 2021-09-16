const Job = require('../models/Job');
const User = require('../models/User');

const jobsController = {

  async all (req, res) {
    if (req.params.userId) {
      const jobs = await Job.findAll({
        where: {
          userId: req.params.userId
        }
      });
      res.json(jobs)
    } else {
      const jobs = await Job.findAll()
      res.json(jobs)
    }
  },
  
  async show (req, res) {
    try {
      if(req.params.userId) {
        const user = await User.findByPk(req.params.userId)
        if(!user) {
          throw new Error("N such user found")
        }
        const job = await Job.findOne({
          where: {
            userId: user.id,
            id: req.params.id
          }
        })
        if (!job){
          throw new Error(`No such job found for user`)
        }
        res.json(job)
      } else {
        const job = await Job.findByPk(req.params.id)
        if (!job) {
          throw new Error ("No such job found")
        }
        res.json(job)
      }
    } catch(e){

      return res.status(404).json({
        error: e.message
      })
    }
  }, 

  async new (req, res) {
    const data = {...req.body}
    try {
      if (req.params.userId) {
        const user = await User.findByPk(req.params.userId)
        if (!user) {
          throw new Error('Can create new job with user')
        }
        const job = await user.createJob(data)
        res.json(job)
      } else {
        const job = await Job.create(data)
        res.json(job)
      }
    } catch (e) {
      const errors = e.errors.map(er => er.message)
      return res.status(422).json({
        errors: {body: [errors]}
      })
    }
  },

  async edit (req, res) {
    res.send(`<h1> this route to edit the job with id of ${req.params.id}`)
  },

  async delete (req, res) {
    res.send(`this will delete the job with id of ${req.params.id}`)
  }
};

module.exports = jobsController;