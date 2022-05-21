const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');

const PORT = 3000;

//middleware
app.use(express.json());
app.use(morgan('dev'));

//connect to DB
mongoose.connect('mongodb://localhost:27017/',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
);

//routes
app.get('/', (req, res) => {
    res.send("Welcome!");
});

//global error-handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({errMsg: err.message});
})

//basic start-up logic
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
});