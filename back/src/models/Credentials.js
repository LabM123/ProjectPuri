const mongoose = require('mongoose')

const credentialsSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    }
})

const Credentials = mongoose.model('Credentials', credentialsSchema)

module.exports = Credentials