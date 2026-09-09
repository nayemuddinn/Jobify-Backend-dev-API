const User = require('../db/models/user')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {

    res.status(StatusCodes.OK).json({ name: 'OK' })
}

const registration = async (req, res) => {

}

module.exports = { login, registration }