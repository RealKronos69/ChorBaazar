import mongoose from 'mongoose'

const schema = mongoose.Schema({
    couponcode:{
        type:String,
        trim:true
    },
    couponamount:{
        type:Number,
        default:0
    },
    expireAt:{
        type:String,
        trim:true
    },
    appliedcount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const coupondb = mongoose.model('coupon',schema)

export default coupondb