const Job = require('../models/Job');
const Interview = require('../models/Interview');


const InterviewRouter = {
  async all(req, res) {
    console.log(req.params)
    if(req.params.jobId){
      const interviews = await Interview.findAll({
        where: {
          jobId: req.params.jobId
        }
      });
      res.json(interviews)
    } else {
      const interviews = await Interview.findAll();
      res.json(interviews)
    }
  },
   
  async show(req, res) {
    try {
      if (req.params.jobId){
        const job = await Job.findByPk(req.params.jobId)

        if(!job) {
          throw new Error("cant show interviews for current job")
        }
        
        const interview = await Interview.findOne({
          where: {
            jobId: req.params.jobId,
            id: req.params.id
          }
        })

        if (!interview) {
          throw new Error("No such Interview found for job ")
        }

        res.json(interview)
      } else {
        const interview = await Interview.findByPk(req.params.id)
        if (!interview) {
          throw new Error("No such Interview found")
        }
        res.json(interview)
      }
    } catch(e) {
      return res.status(404).json({
        error: e.message
      }) 
    }
  },
  

  async new (req, res) {
    const data = {...req.body}
    try {
      if (req.params.jobId){
        const job = await job.findByPk(req.params.jobId)
        if (!job) {
          throw new Error("can not create an inteview for current job")
        }

        const interview = await job.createInterview(data)
        res.json(interview)
      } else {
        const interview = await Interview.create(data)
        res.json(interview)
      }
    } catch (e) {
      const errors = e.errors.map(er => er.message)
      return res.status(422).json({
        errors: {body: [errors]}
      })
    }
  },

  async edit (req, res) {
    const data = {...req.body}
    try {
      if (req.params.jobId){
        const job = await Job.findByPk(req.params.jobId)
        if (!job) {
          throw new Error("Cant edit interview for current job")
        } 

        const interview = await Interview.findOne({
          where: {
            jobId: req.params.jobId,
            id: req.params.id
          }
        })

        if (!interview) {
          throw new Error("No such Interview found for job ")
        }

        const updatedInt = await interview.update(data)
        req.json(updatedInt)
      } else {
        const interview = await Interview.findByPk(req.params.id)
        if(!interview) {
          throw new Error("Interview not found")
        }

        const updatedInt = await interview.update(data)
        res.json(updatedInt)
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
      if (req.params.jobId) {
        const job = await Job.findByPk(req.params.jobId)
        if (!job) {
          throw new Error("Cant delet interview for job")
        }
        const interview = await Interview.findOne({
          where: {
            jobId: job.id,
            id: req.params.id
          }
        })
        if(!interview) {
          throw new Error("No such interview found for job")
        }
        
        const deleteJob = await interview.destroy()
        res.json(deleteJob)
      } else {
        const interview = await Interview.findByPk(req.params.id)
        if (!interview) {
          throw new Error("N interview found")
        }
        const deletedInterview = await interview.destroy()
        res.json(deletedInterview)
      }
    } catch (e) {
      
    }
  }
}

module.exports = InterviewRouter;