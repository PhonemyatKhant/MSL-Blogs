import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test = (req, res) => {
    res.json('Api is working')
}
export const updateUser = async (req, res, next) => {
    let hashedPassword;
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401, 'You dont have access update this user!'))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        hashedPassword = req.body.password !== "" && bcryptjs.hashSync(req.body.password, 10);
    }

    req.body.username && (req.body.username.length < 6 || req.body.username > 20 || req.body.username.includes(" "))
        ? next(errorHandler(400, 'Username must be between 6~20 characters and must not contain spaces!'))
        : req.body.password && (req.body.password = bcryptjs.hashSync(req.body.password, 10));

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                profilePicture: req.body.image
            }
        }, { new: true })
        console.log(updatedUser._doc.password);
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}