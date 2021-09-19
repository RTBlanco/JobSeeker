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
        if (interview) {
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

  },

  async edit (req, res) {

  },

  async delete (req, res) {

  }
}

module.exports = InterviewRouter;