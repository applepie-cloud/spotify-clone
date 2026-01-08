import { Song } from '../models/songModel.js'
import { Album } from '../models/albumModel.js'
import cloudinary from '../lib/cloudinary.js'

// helper func to upload files in cloudinary
const uploadToCloudinary = async (file) => {
    try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url
	} catch (error) {
		console.log("Error in uploadToCloudinary", error)
		next(error)
	}
}
export const checkAdmin = async (req,res,next) => {
    res.status(200).json({ admin : true })
}

export const createSong = async (req,res,next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile)
            return res.status(400).json({ message : 'please upload files' })

        const { title, artists, albumID, duration, genre } = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const imageURL = await uploadToCloudinary(imageFile)
        const audioURL = await uploadToCloudinary(audioFile)

        const song = new Song({
            title,
            artists,
            genre,
            duration,
            audioURL,
            imageURL,
            albumID: albumID || null
        })

        await song.save()

        // if song belongs to album update album 
        if(albumID) {
            await Album.findByIdAndUpdate(albumID,{
                $push : { songs : song._id }
            })
        }
    } catch (error) {
        console.log('song upload failed !!', error)
        next(error)
    }
}

export const deleteSong = async (req,res,next) => {
    try {   
        const { id } = req.params;
        const song = Song.findById(id)

        // if song belong to album
        if(song.albumID) {
            await Album.findByIdAndUpdate(song.albumID,{
                $pull : { songs : song._id }
            })
        }
        
        await Song.findByIdAndDelete(song._id)

        res.status(200).json({ message : 'song deleted successfully' })
    } catch (error) {
        console.log('error in deleting song',error)
        next(error)
    }
}

export const createAlbum = async (req,res,next) => {
    try {
        if(!req.files || req.files.imageFile) 
            return res.status(400).json({ message : 'please upload files' })

        const { albumName,artists,releaseYear } = req.body
        const albumImageURL = await uploadToCloudinary(req.files.imageFile)
        const album = new Album({
            albumName,
            artists,
            releaseYear,
            imageURL: albumImageURL
        })

        album.save()
        res.status(200).json({ message : 'album created successfully' })
    } catch (error) {
        console.log('error in creating album',error)
        next(error)
    }
    
}

export const deleteAlbum = async (req,res,next) => {
    try {
        const { albumId } = req.params
        const foundAlbum = Album.findById(albumId)

        await Song.deleteMany({ _id: { $in: foundAlbum.songs } })
        const deletedAlbum = await Album.findByIdAndDelete(albumId)
        console.log('album deleted successfully',deletedAlbum)
        res.status(200).json({ message : 'delete album success' })
    } catch (error) {
        console.log('error occurred in deleting album',error)
        next(error)
    }
    
}