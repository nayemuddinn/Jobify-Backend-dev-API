const express = require('express')
const app = express()

require('dotenv').config()

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const jobRouter = require('./routes/job')
const authRouter = require('./routes/auth');

const dbConnection = require('./db/connection.js')
const authenticateUser = require('./middleware/auth/authMiddleware');
const PORT = process.env.PORT

const errorHandlerMiddleware = require('./middleware/errorHandler/error-handler')
const addressNotFoundMiddleware = require('./middleware/errorHandler/Address-not-found')

app.use(
    rateLimiter({
        windowMs: 10 * 60 * 1000, // 15 minutes
        max: 10,
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', authenticateUser, jobRouter);

app.use(errorHandlerMiddleware)
app.use(addressNotFoundMiddleware)

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