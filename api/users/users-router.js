const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(result => {
    res.status(200).json(result)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(result => {
    res.status(201).json(result)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
  .then(result => {
    res.status(200).json(result)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
  .then(() => {
    res.status(200).json(req.user)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
  .then(result => {
    res.status(200).json(result)
  })
});

router.post('/:id/posts', validateUserId, validatePost,(req, res) => {
  // console.log(req.body)
  Posts.insert({text: req.body.text, user_id: req.postId}, )
  .then((result) =>{
    console.log("result", result)
    res.status(200).json(result)
  })
});

// do not forget to export the router
module.exports = router