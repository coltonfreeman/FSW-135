const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');

const PORT = 9000;

//middleware
app.use(express.json());
app.use(morgan('dev'));

//connect to DB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/InventorySchema', {family: 4});
  console.log("Connected to MongoDB");
}

//routes
app.use('/inventories', require('./routes/inventoryRouter'));

//global error-handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({errMsg: err.message});
})

//basic start-up logic
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
});