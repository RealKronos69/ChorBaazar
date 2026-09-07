import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './routes/products.js'
import cart from './routes/cart.js'
import user from './routes/user.js'
dotenv.config()


const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://yourdomain.com'
    ],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/user', user)
app.use('/products', products)
app.use('/cart', cart)

try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('mongodb connected')
} catch (e) {
    console.log(e)
}


app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000)