const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')


function logger(req, res, next) {
  console.log(req.method)
  console.log(req.url)
  // console.timeStamp(req)
  next()
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(result => {
    if(result == null){
      next({ status: 404, message: "user not found"})
    }
    else{
      req.user = result;
      next();
    }
  })
  .catch(error => next(error))
}

function validateUser(req, res, next) {
  if(req.body.name == null){
    next({status: 400, message: 'missing required name field'})
  }
  next()
}

function validatePost(req, res, next) {
  if(req.body.text == null){
    next({status: 400, message: 'missing required text field'})
  }
  Users.getById(req.params.id)
  .then(result => {
    console.log("id result",result)
    req.postId = result.id
    next()
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}