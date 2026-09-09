const User = require('../db/models/user')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {

    res.status(StatusCodes.OK).json({ name: 'OK' })
}

const registration = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name }, token
    })
}

module.exports = { login, registration }