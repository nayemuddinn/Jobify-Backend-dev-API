const User = require('../db/models/user')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        ;//will throw error
    }

    const user = await User.findOne({ email })
    if (!user) {
        ;//will throw error
    }

    const validPass = await user.comparePassword(password)

    if (!validPass) {
        ;//will throw errors
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        user: user.name,
        token: token
    })
}

const registration = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name }, token
    })
}

module.exports = { login, registration }