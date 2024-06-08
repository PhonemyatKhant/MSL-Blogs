import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.router.js'
import commentRouter from './routes/comment.router.js'
import cookieParser from 'cookie-parser'
import path from 'path'


dotenv.config()

const __dirname = path.resolve()
const app = express()
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected');
}).catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
})
app.use('/api/user', userRoutes)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// error handling middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})