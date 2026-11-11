const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  // TODO: Create a new Post instance from req.body.
  // TODO: Save it to MongoDB.
  // TODO: Return the created post with status code 201.
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  // TODO: Query all posts from MongoDB.
  // TODO: Return the results as JSON.
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Find one post by id.
  // TODO: Return 404 if the post is not found.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Update the post with req.body.
  // TODO: Return the updated post as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Delete the post by id.
  // TODO: Return a success message as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;

