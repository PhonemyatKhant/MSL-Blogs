import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(req.cookies);
    if (!token) { next(errorHandler(401, `No Token`)) }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized User'))
        }
        req.user = user
        next()
    })
}