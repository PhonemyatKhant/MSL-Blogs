import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createPost, deletePost, getAllPosts, updatePost,getAllCategories } from '../controllers/post.controller.js'

const router = express.Router()


router.post('/create', verifyToken, createPost)
router.get('/all-posts', getAllPosts)
router.get('/all-categories', getAllCategories)
router.delete('/delete/:postId/:userId',verifyToken,deletePost)
router.put('/update/:postId/:userId',verifyToken,updatePost)

export default router