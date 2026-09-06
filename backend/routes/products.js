import express from "express";
import db from "../schema/productschema.js"

const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).json({ message: 'products' })
})

router.post('/', async (req, res) => {
    try {
        const post = req.body
        console.log(post)
        await db.insertOne(post)
        res.status(200).json({ message: 'posted' })
    } catch (e) {
        res.status(400).json({ message: 'not posted' })
    }
})

router.get('/trending', (req, res) => {
    res.status(200).json({ message: 'trending' })
})

export default router

