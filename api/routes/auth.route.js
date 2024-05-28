import express from 'express'
import { signUp, signIn, google, signOut } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/google', google)
authRouter.post('/sign-out', signOut)

export default authRouter