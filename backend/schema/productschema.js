import mongoose from "mongoose";
import crypto from 'crypto'



const schema = mongoose.Schema({
    productId:{
        type:String,
        default:()=>{return crypto.randomBytes(8).toString('hex')}
    },
    name:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        default:0
    },
    about:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    subcategory:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        trim:true,
        default: 'https://www.beyours.in/cdn/shop/files/white-for-bundle_1.jpg?v=1767949967&width=1200'
    },
    location:{
        type:String,
        trim:true,
        default:'kanpur'
    },
    seller:{
        type:String,
        default:'kronos'
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    purchaseCount:{
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const db = mongoose.model('product',schema)

export default db
