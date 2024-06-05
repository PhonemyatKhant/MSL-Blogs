import express from 'express'
import { test, updateUser, deleteUser, getAllUsers, getUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/checkAuthenticated.js'

const router = express.Router()


router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.get('/all-users', verifyToken, getAllUsers)
router.get('/:userId', getUser)

export default router