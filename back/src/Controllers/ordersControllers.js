const { scheduleOrderService, getAllOrdersService, getOrderByIdService, cancelOrderService, activateOrderService, finishOrderService } = require("../Services/ordersService")

module.exports = {
    getAllOrders: async(req, res) => {
        try {
            const allOrders = await getAllOrdersService()
            res.status(200).json(allOrders)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getOrderById: async(req, res) => {
        try {
            const {id} = req.params
            const order = await getOrderByIdService(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    scheduleOrder: async(req, res) => {
        try {
            const {userId, extNum, intNum, section, jugsNum, description, date, time} = req.body
            if(!userId || !extNum || !intNum || !section || !jugsNum || !date || !time) throw new Error('Falta informacion')
            const newOrder = await scheduleOrderService({userId, extNum, intNum, section, jugsNum, description, date, time})
            res.status(200).json(newOrder)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    cancelOrder: async(req, res) => {
        try {
            const {id} = req.params
            const order = await cancelOrderService(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    activateOrder: async(req, res) => {
        try {
            const {id} = req.params
            const order = await activateOrderService(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    finishOrder: async(req, res) => {
        try {
            const {id} = req.params
            const order = await finishOrderService(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
}