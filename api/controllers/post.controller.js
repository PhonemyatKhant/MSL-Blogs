import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req, res, next) => {
    const { isAdmin, id } = req.user
    const { title, category, image, content } = req.body
    if (!isAdmin) next(errorHandler(403, 'You are not allow to do that!'))

    if (!title || !content) next(errorHandler(400, 'Please fill out all the required fields!'))

    const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')

    // post 

    const newPost = new Post({
        title, category, image, content, slug, creatorId: id
    })

    try {
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }


}