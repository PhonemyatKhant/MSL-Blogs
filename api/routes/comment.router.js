import express from 'express'

import { verifyToken } from '../utils/checkAuthenticated.js'
import { createComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/create-comment',verifyToken, createComments)

export default router