import express from "express";
import db from "../schema/productschema.js"

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const { category } = req.query
        const limit = Number(req.query.limit) || 8
        const skip = Number(req.query.skip) || 0
        const products = category ? await db.find({ category }).skip(skip).limit(limit) : await db.find().skip(skip).limit(limit)
        const total = category ? await db.countDocuments({category}) : await db.countDocuments()
        const hasmore = Number(skip) + products.length < total
        res.status(200).json({ products, hasmore })
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

router.get('/overview', async (req, res) => {
    try {
        const { productId } = req.query
        const product = await db.find({ _id: productId })
        res.status(200).json(product)
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

router.get('/trending', (req, res) => {
    res.status(200).json({ message: 'trending' })
})

router.get('/filter', async (req, res) => {
    try {
        const { category, subcategory, limit, skip, ...attributes } = req.query
        // const limit = Number(req.query.limit) || 8
        // const skip = Number(req.query.skip) || 0
        const query = {}

        if (category) {
            query.category = category
        }

        if (subcategory) {
            query.subcategory = subcategory
        }

        Object.entries(attributes).forEach(([key, value]) => {
            query[`attributes.${key}`] = value;
        })
        const products = await db.find(query).skip(Number(skip)).limit(Number(limit))
        const total = await db.countDocuments(query);
        const hasmore = Number(skip) + products.length < total;
        res.status(200).json({products,hasmore})
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

export default router

