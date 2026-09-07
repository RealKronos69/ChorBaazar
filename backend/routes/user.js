import express from 'express'
import userdb from '../schema/userschema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const exists = await userdb.findOne({ username })
        if (!exists) {
            return res.status(400).json({ message: 'user does not exists' })
        }
        const ismatch = await bcrypt.compare(password, exists.password)
        if (!ismatch) {
            return res.status(400).json({ message: 'incorrect password' })
        }
        const payload = {
            userId: exists.userId,
            role: 'user'
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20s' }, async (err, token) => {
            if (err) {
                return res.status(400).json({ message: 'login failed' })
            }
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge:20000
            })
            exists.isactive=true
            await exists.save()
            return res.status(200).json({ message: 'logged in!',token })
        })

    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body
        const exists = await userdb.findOne({ username })
        if (exists) {
            return res.status(400).json({ message: 'user already exists' })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        await userdb.create({ name, username, password:hashedpassword })
        res.status(201).json({ message: 'account created' })
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

export default router