const express = require('express')
const { getAllOrders, getOrderById, scheduleOrder, cancelOrder, activateOrder, finishOrder } = require('../Controllers/ordersControllers')
const ordersRouter = express.Router()

ordersRouter.get('/', getAllOrders)
ordersRouter.get('/:id', getOrderById)
ordersRouter.post('/schedule', scheduleOrder)
ordersRouter.put('/cancel/:id', cancelOrder)
ordersRouter.put('/activate/:id', activateOrder)
ordersRouter.put('/finish/:id', finishOrder)

module.exports = {ordersRouter}