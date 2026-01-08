import { Router } from 'express'
import { protectRoute,requireAdmin } from '../middleware/authMiddleware.js'
import { getAllSongs,getFeaturedSongs,getMadeForYouSongs,getTrendingSongs } from '../Controller/song_controller.js'
const router = Router()

router.get('/all',protectRoute,requireAdmin,getAllSongs)
router.get('/featured',getFeaturedSongs)
router.get('/trending',getTrendingSongs)
router.get('/madeforyou',getMadeForYouSongs)
export default router