import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createComments, deleteComments, editComments, getComments, likeComments,getAllComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/create-comment', verifyToken, createComments)
router.get('/get-comments/:postId', getComments)
router.get('/get-comments', verifyToken, getAllComments)
router.put('/like-comment/:commentId', verifyToken, likeComments)
router.put('/edit-comment/:commentId/:userId', verifyToken, editComments)
router.delete('/delete-comment/:commentId/:userId', verifyToken, deleteComments)


export default router