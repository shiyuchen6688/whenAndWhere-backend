const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }
            req.user = user; // Save the decoded token user in request for use in your routes
            next(); // call the next middleware
        });
    } else {
        res.sendStatus(401); // No token provided
    }
};
