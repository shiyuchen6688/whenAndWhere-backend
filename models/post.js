const mongoose = require('mongoose');


// Define schema of post
const PostSchema = new mongoose.Schema({
    id: Number,
    location: String,
    date: String,
    time: String,
    peopleCount: {
        joined: Number,
        allowed: Number
    },
    restrictions: [String],
    topic: String
});

// Create database model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;