import express from "express";
import cartdb from "../schema/cartschema.js"
import auth from '../middleware/auth.js'
import userdb from '../schema/userschema.js'

const router = express.Router()


router.get('/', auth, async (req, res) => {
    try {
        const user = req.user.userId
        const cart = await cartdb.findOne({ userId: user }).populate('items')
        res.status(200).json(cart)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'something went wrong' })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const { productId } = req.body

        const exists = await cartdb.findOne({
            userId: req.user.userId,
            items: productId
        })

        if (exists) {
            return res.status(400).json({ message: 'item already added!' })
        }
        const cartitem = await cartdb.findOneAndUpdate(
            { userId: req.user.userId },
            {
                $push: {
                    items: productId
                }
            },
            { returnDocument: 'after', upsert: true }
        )
        console.log(cartitem)
        res.status(201).json({ message: 'added to cart!', cartitem })
    } catch (e) {
        res.status(500).json({ message: 'cant add' })
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const { _id } = req.body
        await cartdb.findOneAndUpdate(
            { userId: req.user.userId },
            { $pull: { items: _id } },
            { new: true }
        )
        res.status(200).json({message:'item deleted from cart!'})
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }
})

export default router 