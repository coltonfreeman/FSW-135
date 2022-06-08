const express = require("express");
const app = express();
require('dotenv').config()
const morgan = require("morgan");
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');


const PORT = 9000;

//middleware
app.use(express.json());
app.use(morgan('dev'));

//connect to DB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/userSchema', {family: 4});
  console.log("Connected to MongoDB");
}

//routes
app.use('/auth', require('./routes/authRouter'));
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}));
app.use('/api/issue', require('./routes/issueRouter'));



//global error-handler
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "UnauthorizedError") {
      res.status(err.status);
    }
    return res.send({errMsg: err.message});
})

//basic start-up logic
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
});