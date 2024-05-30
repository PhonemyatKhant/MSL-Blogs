import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoQknffmaNGPU5EEJuex257aR6ZIbmUlgcDQ&usqp=CAU "
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const User = model('User', userSchema)

export default User