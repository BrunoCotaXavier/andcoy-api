const express = require('express');

const { tokenValidation } = require('../middlewares/tokenValidation');
const { createOrder, getOneOrder, removeOrder } = require('../service/order.service');

const route = express.Router();

route.post('/create-order', /* tokenValidation, */ async (req, res) => {
    const params = req.body
    createOrder(params)
        .then(bag => res.json(bag))
        .catch(error => res.status(400).json({ message: error.message }))
});

route.get('/get-order/:id', /* tokenValidation, */ async (req, res) => {
    const params = req.params
    getOneOrder(params)
        .then(bag => res.json(bag))
        .catch(error => res.status(400).json({ message: error.message }))
});

route.delete('/remove-order/:id_order', /* tokenValidation, */ async (req, res) => {
    const data = req.params
    removeOrder(data)
        .then(bag => res.json(bag))
        .catch(error => res.status(400).json({ message: error.message }))
});


module.exports = route;