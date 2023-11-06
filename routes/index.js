var express = require('express');


var postsRouter = require('./posts');
// var userRouter = require('./routes/users');

var router = express.Router();

// Use the 'postsRouter' middleware for requests that match the '/posts' path.
router.use('/posts', postsRouter);
// app.use('/posts', verifyJWT, postsRouter); // this is for user authentication, do this later

// app.use('/users', userRouter);

module.exports = router;
