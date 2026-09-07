import mongoose from 'mongoose'

const schema = mongoose.Schema({
    userId:{
        type:String,
        ref:'user',
        trim:true
    },
    items:[
        {
            type:String,
            ref:'product'
        }
    ]
})

const cartdb = mongoose.model('cart',schema)

export default cartdb
