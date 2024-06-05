import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComments = async (req, res, next) => {
    const { id } = req.user
    const { userId, postId, comment } = req.body
    if (userId !== id) {
        return next(errorHandler(401, 'Unauthorized User!'))
    }
    try {
        const newComment = Comment({
            comment,
            postId,
            userId
        })

        await newComment.save()

        res.status(200).json(newComment)

    } catch (error) {
        next(error)
    }
}