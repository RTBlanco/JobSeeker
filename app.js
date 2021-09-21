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
const InterviewRouter = require('./routes/interviews');

const app = express();

// consider using migrations in the future
// const sync = async () => await sequalize.sync()
// sync()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array())
app.use(cors())

// routes 
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);
app.use('/interviews', InterviewRouter);

app.listen(3000, () => {
  console.log('server started on http://localhost:3000/')
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


module.exports = app;
