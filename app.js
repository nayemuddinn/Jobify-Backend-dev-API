const express = require('express')
const app = express()

require('dotenv').config()
const jobsRouter = require('./routers/jobs')
const authRouter = require('./routers/auth');

const dbConnection = require('./db/connection.js')
const PORT = process.env.PORT


app.use(express.json());


const start = async () => {
    try {
        await dbConnection(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server runnng at port ${PORT}`)
        })

    }
    catch (err) {
        console.log(err)
    }
}

start();