const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required : true
  },
  description : {
    type : String,
    required : true ,
  },
  price : {
    type : Number,
    required : true ,
  },
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;