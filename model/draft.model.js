const mongoose = require('mongoose')

const draftSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    to: {
        type: String,
    }

}, { timestamps: true })

const Draft = mongoose.model('Draft', draftSchema)

module.exports = Draft