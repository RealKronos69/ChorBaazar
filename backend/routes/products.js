import express from "express";
import db from "../schema/productschema.js"

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const {category} = req.query
        const products = category ? await db.find({category}) : await db.find()
        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({ message: 'some error occured while fetching products' })
    }
})

router.post('/', async (req, res) => {
    try {
        const post = req.body
        await db.insertOne(post)
        res.status(200).json({ message: 'posted' })
    } catch (e) {
        res.status(500).json({ message: 'not posted' })
    }
})

router.get('/overview',async (req,res)=>{
    try {
        const {productId} = req.query
        const product = await db.find({productId})
        res.status(200).json(product)
    } catch (e) {
        res.status(500).json({message:'something went wrong'})
    }
})

router.get('/trending', (req, res) => {
    res.status(200).json({ message: 'trending' })
})

export default router

