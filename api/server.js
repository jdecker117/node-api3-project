const express = require('express');
const userRouter = require('./users/users-router')
const {logger} = require('./middleware/middleware')

const server = express();

server.use(express.json());

// global middlewares and the user's router need to be connected here


server.use(logger)

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  let { status = 500, message = 'internal server error' } = err;
  res.status(status).json({ message: message });
});

module.exports = server;
