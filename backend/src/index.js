import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import path from 'path'
import { clerkMiddleware } from '@clerk/express'
import { ConnectDB } from './lib/db.js'
import dotenv from 'dotenv'
import { intializeSocket } from './lib/socket.js'
import { createServer } from 'http'
import userRoutes from './routes/user_routes.js'
import authRoutes from './routes/auth_routes.js'
import adminRoutes from './routes/admin_routes.js'
import albumsRoutes from './routes/album_routes.js'
import songsRoutes from './routes/song_routes.js'
import statsRoutes from './routes/stat_routes.js'

dotenv.config({ path: '../.env' })
const app = express()
const PORT = process.env.PORT
const __dirname= path.resolve()
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

const httpServer = createServer(app)
intializeSocket(httpServer)

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,'tmp'),
    createParentPath : true,
    limits : {
        fileSize : 10*1024*1024 // 10 mb
    }
}))
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/songs',songsRoutes)
app.use('/api/albums',albumsRoutes)
app.use('/api/stats',statsRoutes)

// Debug endpoint: manually test user creation
app.post('/api/debug/create-user', async (req, res) => {
    try {
        const { User } = await import('./models/userModel.js')
        const testUser = await User.create({
            clerkID: 'test-' + Date.now(),
            fullName: 'Test User',
            imageURL: 'https://via.placeholder.com/150'
        })
        console.log('Test user created:', testUser._id)
        res.status(200).json({ success: true, userId: testUser._id })
    } catch (error) {
        console.error('Debug create-user error:', error)
        res.status(500).json({ error: error.message })
    }
})

app.use((err,req,res,next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
})

app.get('/',(req,res) => {
    res.send('Hello world')
})

httpServer.listen(PORT,() => {
    console.log("Listening on port " + PORT)
    ConnectDB()
})
