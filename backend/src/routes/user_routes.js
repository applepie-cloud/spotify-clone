import { Router } from 'express'

import { protectRoute,requireAdmin } from '../middleware/authMiddleware.js'
import { getAllUsers,getUserById,getMessages } from '../Controller/user_controller.js'

const router = Router()
router.use(protectRoute)

router.get('/',getAllUsers)
router.get('/:id',getUserById)
router.get('/messages/:id',getMessages)

export default router