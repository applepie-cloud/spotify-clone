import { Album } from '../models/albumModel.js'

export const getAllAlbums = async (req,res,next) => {
    try {
        const allAlbums = await Album.find({})
        res.status(200).json(allAlbums)
    } catch (error) {
        next(error)
    }
}

export const getAlbumById = async (req, res, next) => {
	try {
		const { albumId } = req.params;
        console.log(albumId);
		const album = await Album.findById(albumId).populate("songs");
        

		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}

        console.log(album);
		res.status(200).json(album);
	} catch (error) {
		next(error);
	}
};