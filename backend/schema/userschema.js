import mongoose from 'mongoose'
import crypto from 'crypto'

const schema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    userId:{
        type:String,
        default:()=>crypto.randomBytes(8).toString('hex')
    },
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    isactive:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model('user',schema)

export default user