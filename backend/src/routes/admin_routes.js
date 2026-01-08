import { Router } from 'express'
import { protectRoute,requireAdmin } from '../middleware/authMiddleware.js'
import { createAlbum,createSong,deleteSong,deleteAlbum,checkAdmin } from '../Controller/admin_controller.js'

const router = Router()
router.use(protectRoute,requireAdmin)

router.get('/check',checkAdmin)

router.post('/songs', createSong)
router.delete('/songs/:id',deleteSong)

router.post('/albums', createAlbum)
router.delete('/albums/:id',deleteAlbum)


export default router