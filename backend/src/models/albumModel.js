import mongoose from 'mongoose'

const albumSchema = mongoose.Schema({
        albumName: {
            type : String,
            required : true
        },
        artists: {
            type : [String],
            required : true,
        },
        imageURL: {
            type : String,
            required : true,
        },
        releaseYear: {
            type : Number,
            required : true,
        },
        songs : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Song', required : true}]
    },
    { timestamps : true })

export const Album = mongoose.model('Album',albumSchema)