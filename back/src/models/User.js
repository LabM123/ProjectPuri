const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNum: {
        default: 'N/A',
        type: String,
    },
    credentials: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Credentials',
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    }],
    userType: {
        type: String,
        erum: ['admin', 'customer'],
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User