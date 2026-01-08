import { User } from '../models/userModel.js'

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        const user = await User.findOne({ clerkID: id })

            if (!user) {
                // sign up
                const created = await User.create({
                    clerkID: id,
                    fullName: `${firstName || ''} ${lastName || ''}`.trim(),
                    imageURL: imageUrl || ''
                })
            }

        return res.status(200).json({ success: true })
    } catch (error) {
        console.log('authentication failed', error)
        return next(error)
    }
}