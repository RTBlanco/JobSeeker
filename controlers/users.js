
const userController = {
  all (req, res) {
    res.send("<h1>Users</h1>")
  },
  
  show (req, res) {
    res.send(`<h1>route is info for ${req.params.id}</h1>`)
  }, 

  new (req, res) {
    res.send('<h1>this route is to create a new user</h1>')
  },

  edit (req, res) {
    res.send(`<h1> this route is use to edit the with ${req.params.id}`)
  },

  delete (req, res) {
    res.send(`this will delete the use with ${req.params.id}`)
  }
};

module.exports = userController;