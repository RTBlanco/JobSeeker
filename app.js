const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const sequalize = require('./db/dbConnection');

const multer = require('multer');
const upload = multer();

const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');

const app = express();

// Relations
const User = require('./models/User');
const Job = require('./models/Job');

User.hasMany(Job, {
  onDelete: 'CASCADE'
})
Job.belongsTo(User)





const sync = async () => await sequalize.sync({alter:true})
sync()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array())
app.use(cors())

// routes 
app.use('/api', usersRouter);
app.use('/api/jobs', jobsRouter)

app.listen(3000, () => {
  console.log('server started on http://localhost:3000/')
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
