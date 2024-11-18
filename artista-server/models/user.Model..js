const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type : String ,
    required : true ,
    unique : true ,
  },
  email : {
    type : String ,
    required : true ,
    unique : true ,
  },
  password : {
    type : String ,
    required : true ,
  },
  profilePic : {
    type : String ,
    default : "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  }
},{timestamps : true});

const User = mongoose.model('User',userSchema);

module.exports = User ;