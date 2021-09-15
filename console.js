// -> "npm run console" will open the console

const repl = require("repl");
const User = require("./models/User");
const Job = require("./models/Job");

User.hasMany(Job, {
  onDelete: 'CASCADE'
})
Job.belongsTo(User)



const replServer = repl.start({});
replServer.context.User = User
replServer.context.Job = Job