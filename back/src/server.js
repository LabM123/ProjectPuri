const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const { usersRouter } = require('./Routers/usersRouter');
const { ordersRouter } = require('./Routers/ordersRouter');

const app = express()

//* MIDDLEWARES
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//* ROUTES
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)

module.exports = app;