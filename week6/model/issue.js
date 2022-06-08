const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        date: Date.now
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments : [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model("Issues", issueSchema);