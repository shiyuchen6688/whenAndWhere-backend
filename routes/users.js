var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model


require('dotenv').config(); // Load environment variables from .env file

// This is a mock database - will update to use MongoDB later
const mockDatabase = {
    users: []
};


// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        // Hash the password - with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create new user object
        // const user = { username: req.body.username, password: hashedPassword };
        const user = new User({ username: req.body.username, password: hashedPassword });
        // Save the new user object to the database
        await user.save();
        // Add user to "database"
        // mockDatabase.users.push(user);
        // Send success response
        res.status(201).send(`User ${req.body.username} created`);

        // console.log(mockDatabase.users)
    } catch {
        // On error, send a 500 status code
        res.status(500).send();
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    // Find user by username
    // const user = mockDatabase.users.find(u => u.username === req.body.username);
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        // If user not found, return 400
        return res.status(400).send('Cannot find user');
    }
    try {
        // Compare submitted password with stored hashed password
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Create JWT token
            const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
            // Send the JWT token to the client
            res.json({ accessToken: accessToken });
        } else {
            // If password does not match, send 403
            res.send('Not Allowed');
        }
    } catch {
        // On error, send a 500 status code
        res.status(500).send();
    }
});

module.exports = router