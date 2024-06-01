import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createPost, deletePost, getAllPosts } from '../controllers/post.controller.js'

const router = express.Router()


router.post('/create', verifyToken, createPost)
router.get('/all-posts', getAllPosts)
router.delete('/delete/:postId/:userId',verifyToken,deletePost)

export default router