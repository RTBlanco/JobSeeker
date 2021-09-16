// -> "npm run console" will open the console

const repl = require("repl");
const User = require('./models/User');
const Job = require('./models/Job');
const Interview = require('./models/Interview');

// User has Many jobs 
User.hasMany(Job, { onDelete: 'CASCADE' })
Job.belongsTo(User)

// Jobs has many interviews
Job.hasMany(Interview, {onDelete: "CASCADE"})
Interview.belongsTo(Job)



const replServer = repl.start({});
replServer.context.User = User
replServer.context.Job = Job