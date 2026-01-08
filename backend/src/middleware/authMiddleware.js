import { clerkClient } from "@clerk/express";

export const protectRoute = async (req,res,next) => {
    if(!req.auth.userId) {
        return res.status(401).json({ message : 'unauthorized'})
    }

    next()
}

export const requireAdmin = async (req,res,next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = (currentUser.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL)

        if(!isAdmin) 
            res.status(403).json({ message : 'Unauthorized access admin required'})
        else 
            next()
    } catch (error) {
        next(error)
    }
}