import express from 'express'
import { signUp, signIn,google } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/google', google)

export default authRouter