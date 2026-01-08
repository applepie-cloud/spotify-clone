import { Router } from 'express'
import { Song } from '../models/songModel.js'
import { Album } from '../models/albumModel.js'
import { User } from '../models/userModel.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const [totalSongs, totalAlbums, totalUsers] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments()
        ])

        // Get unique artists from songs
        const songs = await Song.find({})
        const allArtists = songs.flatMap(song => song.artists)
        const totalArtists = new Set(allArtists).size

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtists
        })
    } catch (error) {
        console.error('Error fetching stats:', error)
        res.status(500).json({ message: 'Error fetching statistics' })
    }
})

export default router