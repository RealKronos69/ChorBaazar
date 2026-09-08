import mongoose from 'mongoose'

const schema = mongoose.Schema({
    userId:{
        type:String,
        ref:'user',
        trim:true
    },
    items:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ]
})

const cartdb = mongoose.model('cart',schema)

export default cartdb
