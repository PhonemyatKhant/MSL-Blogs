import express from 'express'
import { signUp,signIn } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)

export default authRouter