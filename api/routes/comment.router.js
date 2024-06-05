import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createComments,getComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/create-comment', verifyToken, createComments)
router.get('/get-comments/:postId', getComments)
export default router