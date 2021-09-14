
const jobsController = {
  all (req, res) {
    console.log(req.params)
    res.send("<h1>Gets all Jobs</h1>")
  },
  
  show (req, res) {
    console.log(req.params)
    res.send(`<h1>route is get info for job with id of  ${req.params.id}</h1>`)
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