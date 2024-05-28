import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All Fields Are Required '))
    }
    // hashpassword
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    //    create new user 
    try {
        await newUser.save()

        res.json('New User Created!')
    } catch (error) {
        next(error)
    }
}
export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All Fields Are Required!'))
    }
    try {
        // find user from db 
        const validUser = await User.findOne({ email })
        if (!validUser) { return next(errorHandler(404, 'User Not Found!')) }

        // match password from found user 

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        console.log(password, validUser.password, 'passwords');
        // const validPassword = password === validUser.password
        if (!validPassword) { return next(errorHandler(404, "Invalid Password")) }

        // create a token with user id from db
        const token = jwt.sign({
            id: validUser._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        //separate password _doc leaves out unnecessary mongoose properties
        const { password: pass, ...rest } = validUser._doc

        // response the user object and set cookie 
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)

    } catch (error) {
        next(error)
    }
}
//google
export const google = async (req, res, next) => {
    const { name, email, googlePhotoURL } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
            const { password, ...rest } = user._doc
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
        } else {
            const initialPassword = email + name
            const hashedPassword = bcryptjs.hashSync(initialPassword, 10)

            const newUser = new User({
                username: name,
                email: email,
                password: hashedPassword,
                profilePicture: googlePhotoURL
            })

            await newUser.save()

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
            const { password, ...rest } = user._doc
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
        }
    } catch (error) {
        next(error)
    }
}
//sign out

export const signOut = async (req, res, next) => {
    try {
        res.status(200).clearCookie('access_token').json('User has been signed out');
    } catch (error) {
        next(error)
    }
}