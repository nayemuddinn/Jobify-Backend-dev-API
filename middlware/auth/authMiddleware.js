const User = require('../../db/models/user')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || authHeader.startsWith('Beared'))
        ;;//will throw error
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payload.userId,
            name: payload.name
        }

    }
    catch (error) {
        ;//will throw error
    }
}