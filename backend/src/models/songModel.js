import mongoose from 'mongoose'

const songSchema = mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    artists: {
        type : [String],
        required : true
    },
    songImgURL: {
        type : String,
        required : true,
    },
    audioURL: {
        type : String,
        required : true,
    },
    duration: {
        type : Number,
        required : true,
    },
    albumID: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Album',
        required : false
    },
    genre: {
        type : [String],
        required : true,
    },
    likes: {
        type : Number,
        required : true,
    }
}, { timestamps : true })

export const Song = mongoose.model('Song',songSchema)