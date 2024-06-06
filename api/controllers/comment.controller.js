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
export const getComments = async (req, res, next) => {
    const { postId } = req.params
    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const likeComments = async (req, res, next) => {
    const { commentId } = req.params

    try {
        const comment = await Comment.findById(commentId)

        console.log(comment, 'this ran');
        if (!comment) return next(errorHandler(404, 'Comment not found!'))

        const commenterIndex = comment.likes.findIndex((userId) => userId === req.user.id)
        if (commenterIndex === -1) {
            comment.likesCount += 1
            comment.likes.push(req.user.id)
        } else {
            comment.likesCount -= 1
            comment.likes.splice(commenterIndex, 1)
        }
        await comment.save()

        res.status(201).json(comment)
    } catch (error) {
        next(error)
    }
}
export const editComments = async (req, res, next) => {
    const { commentId, userId } = req.params
    const { isAdmin, id } = req.user


    try {
        if (!isAdmin && id !== userId) return next(errorHandler(401, 'You dont have access to edit this comment !!'))
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            $set: {
                comment: req.body.comment
            }
        }, { new: true })


        res.status(201).json(updatedComment)

    } catch (error) {
        next(error)
    }
}