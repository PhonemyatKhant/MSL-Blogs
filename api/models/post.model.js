import mongoose, { Schema, model } from "mongoose";


const postSchema = Schema({
    creatorId: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
        required: true,

    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3sqn2BcwAQWdZISY4yCpA0L8QEiGjWE2IrQ&usqp=CAU"
    }
}, { timestamps: true })

const Post = model('Post', postSchema)

export default Post