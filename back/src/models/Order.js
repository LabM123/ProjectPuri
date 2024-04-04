const mongoose = require('mongoose')
const User = require('./User')

const orderSchema = new mongoose.Schema({
    extNum: {
        type: String,
        required: true
    },
    intNum: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    jugsNum: {
        type: String,
        required: true
    },
    description: {
        default: 'N/A',
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Activo', 'Cancelado', 'Terminado'],
        required: true
    },
    user: {
        type: Object,
        required: true
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order