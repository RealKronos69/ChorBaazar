import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'no token found' })
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (e) {
        res.status(401).json({ message: 'invalid token' })
    }
}

export default auth