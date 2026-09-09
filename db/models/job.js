const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide a company name'],
            maxlength: 20
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            maxlength: 100
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: [true, 'Please provide user']
        }


    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Jobs', jobSchema)