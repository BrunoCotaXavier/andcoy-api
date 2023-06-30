const { where } = require('sequelize');
const db = require('../models/index')

const createOrder = async (data) => {
    try {
        const newOrder = await db.Order.create(data)
        return newOrder;
    } catch (error) {
        throw new Error('Erro ao criar Pedido: ' + error);
    }
}

const getOneOrder = async (data) => {
    try {
        const newOrder = await db.Order.findOne({ where: { id: data.id } })
        return newOrder;
    } catch (error) {
        throw new Error('Erro ao criar Pedido: ' + error);
    }
}

const removeOrder = async (data) => {
    try {
        const order = await db.Order.findByPk(data.id_order)
        return await order.destroy();
    } catch (error) {
        throw new Error('Erro ao criar Pedido: ' + error);
    }
}

module.exports = { createOrder, getOneOrder, removeOrder }