const Credentials = require('../models/Credentials')

module.exports = {
    createCredentials: async (password) => {
        const newCredentials = new Credentials({password})
        const savedCredentials = await newCredentials.save()
        return savedCredentials
    },
}