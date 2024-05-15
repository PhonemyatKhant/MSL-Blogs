import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()
const app = express()
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