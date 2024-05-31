import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createPost, getAllPosts } from '../controllers/post.controller.js'

const router = express.Router()


router.post('/create', verifyToken, createPost)
router.get('/all-posts', getAllPosts)

export default router