var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv =  require('dotenv');
const db = require('./database/db');

dotenv.config();

var authRouter = require('./routes/auth.routes.js');
var postRouter = require('./routes/post.routes.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* api routes */ 
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/post' , postRouter);


app.use((err,req,res,next) => {
  let statusCode = err.statusCode || 500 ;
  let message = err.message || "Internal server error" ;
  res.status(statusCode).json({
    success : false , 
    statusCode ,
    message 
  })
})


module.exports = app;
