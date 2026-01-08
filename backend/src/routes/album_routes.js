import { getAuth } from '@clerk/express'
import { Router } from 'express'
import { getAllAlbums,getAlbumById } from '../Controller/album_controller.js'

const router = Router()

// router.use(getAuth()) // Temporarily disabled for debugging

router.get('/', getAllAlbums)
router.get('/:albumId',getAlbumById)

export default router