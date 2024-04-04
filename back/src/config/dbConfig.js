const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGODB_URI

const dbConfig = async () => {
    await mongoose.connect(uri);
}

module.exports = dbConfig;