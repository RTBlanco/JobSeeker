
const jobsController = {

  all (req, res) {
    console.log(req.params)
    res.send(jobs)
  },
  
  show (req, res) {
    console.log(req.params)
    if (req.params.userId) {
      const userJobs = jobs.filter(job => job.userId == req.params.userId)
      const job = userJobs.find(j => j.id  == req.params.id)
      res.send(job)
    } else {
      res.send(jobs)
    }
    
  }, 

  new (req, res) {
    res.send('<h1>this route is to create a new job</h1>')
  },

  edit (req, res) {
    res.send(`<h1> this route to edit the job with id of ${req.params.id}`)
  },

  delete (req, res) {
    res.send(`this will delete the job with id of ${req.params.id}`)
  }
};

module.exports = jobsController;