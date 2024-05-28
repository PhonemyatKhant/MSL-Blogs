import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test = (req, res) => {
    res.json('Api is working')
}
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401, 'You dont have access update this user!'))
    }
    req.body.password && req.body.password.length < 6
        ? next(errorHandler(400, 'Password must not be less than 6 characters!'))
        : req.body.password && (req.body.password = bcryptjs.hashSync(req.body.password, 10));

    req.body.username && (req.body.username.length < 6 || req.body.username > 20 || req.body.username.includes(" "))
        ? next(errorHandler(400, 'Username must be between 6~20 characters and must not contain spaces!'))
        : req.body.password && (req.body.password = bcryptjs.hashSync(req.body.password, 10));

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                profilePicture: req.body.profilePicture
            }
        }, { new: true })

        // const { password, ...rest } = updatedUser._doc
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}