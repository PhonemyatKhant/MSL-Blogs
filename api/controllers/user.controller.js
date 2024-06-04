import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test = (req, res) => {
    res.json('Api is working')
}
export const updateUser = async (req, res, next) => {
    let hashedPassword;
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401, 'You dont have access to update this user!'))
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
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401, 'You dont have access to delete this user account!'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    const { id, isAdmin } = req.user
    const { userId } = req.params

    if (id !== userId && !isAdmin) next(errorHandler(403, 'You dont have a permisson to see all the users!'))

    try {

        const startIndex = Number(req.query.startIndex || 0)
        const limit = Number(req.query.limit || 9)
        const sortDirection = Number(req.query.sortDirection === "asc" ? 1 : -1)

        const allUsers = await User.find({}).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)

        const usersWithoutPassword = allUsers.map(user => {
            const { password, ...rest } = user._doc
            return rest
        })

        res.status(200).json(usersWithoutPassword)
    } catch (error) {
        next(error)
    }
}