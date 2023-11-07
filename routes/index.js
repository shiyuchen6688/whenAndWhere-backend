var express = require('express');


var postsRouter = require('./posts');
var userRouter = require('./users');

var router = express.Router();

// Use the 'postsRouter' middleware for requests that match the '/posts' path.
router.use('/posts', postsRouter);
// router.use('/posts', verifyJWT, postsRouter); // this is for user authentication, do this later

router.use('/users', userRouter);

module.exports = router;
