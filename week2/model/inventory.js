const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20
    },
    value: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);