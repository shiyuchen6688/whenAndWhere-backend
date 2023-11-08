var express = require('express');
const mainRouter = require('./routes/index');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const cors = require('cors');
const mongoose = require('mongoose');


var app = express();
const port = process.env.PORT || 3001;

// var verifyJWT = require("./middlewares/auth")
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// try to connect to the database
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});

// console.log(mongoURI)

// Enable Cors
// app.use(cors());

// app.use(logger('dev'));
// Parse incoming JSON requests and make the data available in the 'req.body' object.
app.use(express.json());
// Parse URL-encoded form data from incoming requests and make it available in 'req.body'.
// The 'extended: false' option means we will use the built-in querystring library.
app.use(express.urlencoded({ extended: false }));
// Parse cookies from incoming requests and make them available in 'req.cookies'.
// app.use(cookieParser());

// Mount the router on the /api path
app.use('/api', mainRouter);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


module.exports = app;
