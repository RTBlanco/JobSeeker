const {Interview, Job} = require('../models')


// TODO: refactor all the methods

const InterviewRouter = {
  async all(req, res) {
    console.log(req.params)
    try {
      const job = await Job.findOne({
        where: {
          UserId: req.user.id,
          id: req.params.jobId
        }
      })

      if (!job) {
        throw new Error("Cant access Interviews for job")
      }

      const interviews = await job.getInterviews()
      res.json(interviews)
      
    } catch (error) {
      res.json({
        error: error.message
      })
    }
  },
   
  async show(req, res) {
    try {
      
      const job = await Job.findOne({
        where: {
          id: req.params.jobId,
          UserId: req.user.id
        }
        , 
        include: Interview
      })

      if(!job) {
        throw new Error("cant show interviews for current job")
      }
      
      const interviews = await job.getInterviews()
      const interview = interviews.find(i => {
        console.log(i.id)
        if (i.id === req.params.id) {
          return i
        }
      } ) 
      console.log(interview)
      if (!interview) {
        throw new Error("No such Interview found for job ")
      }

      res.json(interview)
      
    } catch(e) {
      return res.status(404).json({
        error: e.message
      }) 
    }
  },
  

  async new (req, res) {
    const data = {...req.body}
    console.log(req.params)
    try {
      
      const job = await Job.findOne({
        where: {
          id: req.params.jobId,
          UserId: req.user.id
        }
      })
      if (!job) {
        throw new Error("can not create an inteview for current job")
      }

      const interview = await job.createInterview(data)
      res.json(interview)
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
    try {
      const job = await Job.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
        , 
        include: {
          Interview
        }
      })

      if (!job) {
        throw new Error("Cant edit interview for current job")
      } 

      const interviews = await Job.getInterviews()
      const interview = interviews.find(i => i.id === req.params.id ) 

      if (!interview) {
        throw new Error("No such Interview found for job ")
      }

      const updatedInt = await interview.update(data)
      req.json(updatedInt)
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
      const job = await Job.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
        , 
        include: {
          Interview
        }
      })

      if (!job) {
        throw new Error("Cant edit interview for current job")
      } 

      const interviews = await Job.getInterviews()
      const interview = interviews.find(i => i.id === req.params.id ) 

      if (!interview) {
        throw new Error("No such Interview found for job ")
      }
      
      await interview.destroy()
      res.json(interview)
     
    } catch (e) {
      res.status(422).json({
        error: e.message
      })
    }
  }
}

module.exports = InterviewRouter;