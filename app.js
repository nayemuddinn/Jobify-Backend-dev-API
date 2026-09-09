const express = require('express')
const app = express()

require('dotenv').config()
const jobsRouter = require('./routes/job')
const authRouter = require('./routes/auth');

const dbConnection = require('./db/connection.js')
const PORT = process.env.PORT


app.use(express.json());
app.use('/api/v1/auth', authRouter);

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