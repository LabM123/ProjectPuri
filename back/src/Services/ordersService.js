const Order = require("../models/Order")
const User = require("../models/User")

module.exports = {
    getAllOrdersService : async() => {
        const orders = await Order.find()
        return orders
    },
    getOrderByIdService: async (orderId) => {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Orden no encontrada');
            } else {
                return order;
            }
        } catch (error) {
            throw new Error(`Error al buscar la orden por ID: ${error.message}`);
        }
    },
    scheduleOrderService: async ({ userId, extNum, intNum, section, jugsNum, description, date, time }) => {
        try {
            const user = await User.findById(userId).exec();
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const newOrder = new Order({ extNum, intNum, section, jugsNum, description, date, time, status: 'Activo', user: {firstName: user.firstName, phoneNum: user?.phoneNum} });
            const savedOrder = await newOrder.save();
            user.orders.push(savedOrder);
            await user.save();
            return savedOrder;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    cancelOrderService : async(orderId) => {
        try {
            const order = await Order.findById(orderId);
            if(!order) throw new Error('Orden no encontrada');
            order.status = 'Cancelado';
            await order.save();
            return order
        } catch (error) {
            throw new Error(`Error al buscar la orden por ID: ${error.message}`);
        }
    },
    activateOrderService : async(orderId) => {
        try {
            const order = await Order.findById(orderId);
            if(!order) throw new Error('Orden no encontrada');
            order.status = 'Activo';
            await order.save();
            return order
        } catch (error) {
            throw new Error(`Error al buscar la orden por ID: ${error.message}`);
        }
    },
    finishOrderService : async(orderId) => {
        try {
            const order = await Order.findById(orderId);
            if(!order) throw new Error('Orden no encontrada');
            order.status = 'Terminado';
            await order.save();
            return order
        } catch (error) {
            throw new Error(`Error al buscar la orden por ID: ${error.message}`);
        }
    },
}