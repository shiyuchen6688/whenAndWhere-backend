const express = require('express');
const router = express.Router();
// Import mongoose model for Post
const Post = require('../models/post');

// Define an array to store posts
var posts = [
    {
        // id: 1,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography1"
    },
    {
        // id: 2,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet2"
    },
    {
        // id: 3,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography3"
    },
    {
        // id: 4,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet4"
    },
    {
        // id: 5,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography5"
    },
    {
        // id: 6,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet6"
    },
    {
        // id: 7,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography7"
    },
    {
        // id: 8,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet8"
    },
];

// add initial posts to database if not exist
const seedPosts = async () => {
    try {
        if (await Post.countDocuments() == 0) {
            for (let i = 0; i < posts.length; i++) {
                var newPost = new Post(posts[i]);
                await newPost.save();
            }
            console.log('All initial posts have been added');
        }
        console.log('No initial posts have been added');
    } catch (err) {
        console.error({ message: err.message });
    }
};

seedPosts();

// Define routes for your API
router.get('/', async (req, res) => {
    // res.json(posts);
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST endpoint to create a new post
router.post('/', async (req, res) => {
    // const newPost = new Post(req.body);
    // // posts.push(newPost);
    // // console.log(req.body)
    // // console.log(posts)
    // // save to database instead
    // await this.post.save();
    // res.status(201).json("Post created successfully");
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT endpoint to update an post by id
router.put('/:id', async (req, res) => {
    // const postId = Number(req.params.id);
    // const postIndex = posts.findIndex(post => post.id === postId);

    // if (postIndex >= 0) {
    //     posts[postIndex] = { ...posts[postIndex], ...req.body };
    //     // console.log(req.body)
    //     res.send(`post updated successfully to ${JSON.stringify(posts[postIndex])}`);
    // } else {
    //     res.status(404).send('post not found');
    // }
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE endpoint to delete an post by id
router.delete('/:id', async (req, res) => {
    // const postId = Number(req.params.id);
    // posts = posts.filter(post => post.id !== postId);
    // res.send('post deleted successfully');
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        // console.log(post)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;