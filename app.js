const express = require('express')
const app = express()

require('dotenv').config()
const jobRouter = require('./routes/job')
const authRouter = require('./routes/auth');

const dbConnection = require('./db/connection.js')
const authenticateUser = require('./middleware/auth/authMiddleware');
const PORT = process.env.PORT

const errorHandlerMiddleware = require('./middleware/errorHandler/error-handler')


app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', authenticateUser, jobRouter);

app.use(errorHandlerMiddleware)

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