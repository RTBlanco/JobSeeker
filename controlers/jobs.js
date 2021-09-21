const { User, Job } = require('../models');

const jobsController = {

  // async all (req, res) {
  //   if (req.params.userId) {
  //     const jobs = await Job.findAll({
  //       where: {
  //         UserId: req.params.userId
  //       }
  //     });
  //     res.json(jobs)
  //   } else {
  //     const jobs = await Job.findAll()
  //     res.json(jobs)
  //   }
  // },

  async all(req, res) {
    try {
      const user = await User.findByPk(req.user.id)
      if (!user) {
        throw new Error("User not logged in")
      }
      const jobs = await Job.findAll({where:{UserId: user.id}, include: {all: true, nested: true}})
      res.json(jobs)
    } catch (error) {
      res.send(error.message)
    }
  },
  
  // TODO: add user auth
  async show (req, res) {
    try {
      if(req.params.userId) {
        const user = await User.findByPk(req.params.userId)
        if(!user) {
          throw new Error("cant show job with current user")
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
          throw new Error('Can not create new job with current user')
        }

        // const job = await Job.create({...data, UserId: user.id})
        // res.json(job)
        const job = await user.createJob(data)
        res.json(job)
      } else {
        const job = await Job.create(data)
        res.json(job)
      }
    } catch (e) {
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
    const data = {...req.body}
    console.log(data)
    try {
      if (req.params.userId) {
        const user = await User.findByPk(req.params.userId)
        if (!user) {
          throw new Error('Cant edit Job with current user')
        }
        const job = await Job.findOne({
          where: {
            userId: user.id,
            id: req.params.id
          }
        })
        if(!job) {
          throw new Error("Job not found for current User")
        }
        const updatedJob = await job.update(data)
        res.json(updatedJob)
      } else {
        const job = await Job.findByPk(req.params.id)
        if(!job) {
          throw new Error("Job not found")
        }
        const updatedJob = await job.update(data)
        res.json(updatedJob)
      }
    } catch (e) {

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

  async delete (req, res) {
    try {
      if(req.params.userId) {
        const user = await User.findByPk(req.params.userId)
        if(!user) {
          throw new Error("cant delete job with current user")
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
        const deletedJob = await job.destroy()
        res.json(deletedJob)
      } else {
        const job = await Job.findByPk(req.params.id)
        if (!job) {
          throw new Error('No such job found')
        } 
        const deletedJob = await job.destroy()
        res.json(deletedJob)
      }
    } catch (e) {
      res.status(422).json({
        error: e.message
      })
    }
  }
};

module.exports = jobsController;