const mongoose = require('mongoose');
const refType = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: refType,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;