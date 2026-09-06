import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './routes/products.js'
dotenv.config()


const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://yourdomain.com'
    ],
}))
app.use(express.json())
app.use('/products', products)

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