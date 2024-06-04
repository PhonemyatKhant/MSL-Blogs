import express from 'express'
import { test, updateUser, deleteUser, getAllUsers } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/checkAuthenticated.js'

const router = express.Router()

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.get('/all-users/:userId', verifyToken, getAllUsers)

export default router