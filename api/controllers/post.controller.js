
import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req, res, next) => {
    const { isAdmin, id } = req.user
    const { title, category, image, content } = req.body
    console.log(req.body);
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

// get posts 

export const getAllPosts = async (req, res, next) => {

    try {
        const { creatorId, category, slug, postId, searchTerm } = req.query;

        // query string object 

        const queryObject = {
            ...(creatorId && { creatorId }),
            ...(category && { category }),
            ...(slug && { slug }),
            ...(postId && { _id: postId }),
            ...(searchTerm && {
                $or: [
                    { title: { $regex: new RegExp(req.query.searchTerm, 'i') } },
                    { content: { $regex: new RegExp(req.query.searchTerm, 'i') } }
                ]
            })
        };

        // console.log(queryObject);

        const startIndex = Number(req.query.startIndex || 0)
        const limit = Number(req.query.limit || 9)
        const sortDirection = Number(req.query.sortDirection === "asc" ? 1 : -1)

        // get posts based on query 

        const posts = await Post.find({ ...queryObject }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit)

        // get posts count total and one month ago 

        const totalPosts = await Post.countDocuments()

        const now = new Date()
        const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        const totalPostsOneMonthAgo = await Post.countDocuments({
            createdAt: { $gte: previousMonthDate },
        }
        )

        res.status(200).json({ posts, totalPosts, totalPostsOneMonthAgo })
    } catch (error) {
        next(error)
    }
}