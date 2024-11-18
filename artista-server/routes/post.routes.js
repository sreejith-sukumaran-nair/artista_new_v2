var express = require('express');
var router = express.Router();
const errorHandler = require('../utils/error.js');
const Post = require('../models/post.Model.js');
const verifyToken = require('../utils/verifyUser.js');

/* Router for creating a post */

router.post('/create', verifyToken, async (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;

  if (!req.user) {
    return next(errorHandler(401, 'Unauthorized access'));
  }

  if (!title || !price || !description || !imageUrl) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const newPost = new Post({
    title,
    price : Number(price),
    description,
    imageUrl,
    authorId: req.user.id,
  });

  try {
    await newPost.save();
    res.status(200).json(
      newPost
    )

  } catch (error) {
    return next(error);
  }
});

/* Route for getting all posts including author filed */

router.get('/getPosts', async (req, res, next) => {

  try {
    const postsWithAuthors = await Post.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "authorId", 
          foreignField: "_id", 
          as: "authorDetails", 
        },
      },
      {
        $unwind: "$authorDetails", 
      },
      {
        $sort: { updatedAt : -1}
      }
    ]);
    return res.status(200).json(postsWithAuthors);
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
