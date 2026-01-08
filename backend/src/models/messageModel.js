import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    sendersId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    recieverId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    content: {
        type: String,
        required : true,
    }
}, { timestamps : true })

export const Message = mongoose.model('Message',messageSchema)