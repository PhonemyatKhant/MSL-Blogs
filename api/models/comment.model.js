import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    comment: {
        type: String,
        require: true
    },
    postId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    likes: {
        type: Array,
        default: []
    },
    likesCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Comment = model('Comment', CommentSchema)

export default Comment