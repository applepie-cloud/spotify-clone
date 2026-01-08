import { Song } from '../models/songModel.js'

export const getAllSongs = async (req,res,next) => {
    try {
        // -1 descending order new -> old
        // 1 ascending order old -> new 
        const allSongs = await Song.find({}).sort({ createdAt: -1 });
        res.json(allSongs)
    } catch (error) {
        next(error)
    }
}

export const getMadeForYouSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artists: 1,
					songImgURL: 1,
					audioURL: 1,
				},
			},
		]);

		res.json(songs);

    } catch (error) {
        next(error)
    }
}

export const getFeaturedSongs = async (req,res,next) => {
    try {
        // fetching random six songs to display in the dashboard 
        const songs = await Song.aggregate([
			{
				$sample: { size: 6 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artists: 1,
					songImgURL: 1,
					audioURL: 1,
				},
			},
		]);

		res.json(songs);

    } catch (error) {
        next(error)
    }
}

export const getTrendingSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artists: 1,
					songImgURL: 1,
					audioURL: 1,
				},
			},
		]);

		res.json(songs);

    } catch (error) {
        next(error)
    }
}