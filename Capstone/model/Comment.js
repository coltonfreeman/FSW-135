const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String, 
        required: true,
        maxLength: 50
    }, 
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema);