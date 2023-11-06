const express = require('express');
const router = express.Router();

// Define an array to store posts
var posts = [
    {
        id: 1,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography"
    },
    {
        id: 2,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet"
    },
    {
        id: 3,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography"
    },
    {
        id: 4,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet"
    },
    {
        id: 5,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography"
    },
    {
        id: 6,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet"
    },
    {
        id: 7,
        location: "Central Park",
        date: "2023-04-15",
        time: "14:00",
        peopleCount: { joined: 5, allowed: 20 },
        restrictions: ["No Alcohol", "No Smoke", "Adults Only"],
        topic: "Spring Photography"
    },
    {
        id: 8,
        location: "Downtown Cafe",
        date: "2023-04-18",
        time: "18:00",
        peopleCount: { joined: 8, allowed: 15 },
        restrictions: ["No Smoke"],
        topic: "Coffee Enthusiasts Meet"
    },
];

// Define routes for your API
router.get('/', (req, res) => {
    res.json(posts);
});

// POST endpoint to create a new post
router.post('/', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    // console.log(req.body)
    // console.log(posts)
    res.status(201).json("Post created successfully");
});

// PUT endpoint to update an post by id
router.put('/:id', (req, res) => {
    const postId = Number(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex >= 0) {
        posts[postIndex] = { ...posts[postIndex], ...req.body };
        // console.log(req.body)
        res.send(`post updated successfully to ${JSON.stringify(posts[postIndex])}`);
    } else {
        res.status(404).send('post not found');
    }
});

// DELETE endpoint to delete an post by id
router.delete('/:id', (req, res) => {
    const postId = Number(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.send('post deleted successfully');
});


module.exports = router;