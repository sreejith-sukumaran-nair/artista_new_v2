var express = require('express');
var router = express.Router();
const errorHandler = require('../utils/error.js');
var bcryptjs = require('bcryptjs');
const User = require('../models/user.Model..js');
const jwt = require('jsonwebtoken');

// router for sign up

router.post('/signup', async (req, res, next) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(401, "All fields are required...Please double chech before you submit the form"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("signed up successfully");
  } catch (error) {
    next(error)
  }

});


// router for sign in 

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === ' ' || password === ' ') {
    return next(errorHandler(400, "All fields are required..."))
  }
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, "Invalid username or password"))
    }
    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(400, "Invalid username or password"))
    }

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET ,{ expiresIn: '1h' });
    
    res.status(200).cookie('access_token',token,{
      httpOnly : true ,
    }).json(rest)
    
  } catch (error) {
    next(error)
  }
})

// Route for sign out

router.post('/signout', async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json("user has been signed out")
  } catch (error) {
    next(error)
  }
})


module.exports = router; 