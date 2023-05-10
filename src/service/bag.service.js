const db = require('../models/index')

const createBag = async (data) => {
    try {
        const newBag = await db.Bag.create({
            user: data.user,
            products: data.products,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            sold: data.sold,
        })
        return newBag;
    } catch (error) {
        throw new Error('Erro ao criar Sacola: '+ error);
    }
}

const getBag = async (data) => {
    try {
        const [newBag] = await db.Bag.findAll()
        console.log(typeof newBag.dataValues.products)
        return newBag;
    } catch (error) {
        throw new Error('Erro ao listar Sacola: '+ error);
    }
}

module.exports = { createBag, getBag }