import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'



dotenv.config()
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