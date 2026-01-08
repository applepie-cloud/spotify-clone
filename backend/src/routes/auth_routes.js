import { Router } from 'express'
import { authCallback } from '../Controller/auth_controller.js' 
const router = Router()

router.post('/callback', authCallback) 

export default router