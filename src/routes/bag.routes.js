const express = require('express');

/* const { tokenValidation } = require('../middlewares/tokenValidation'); */
/* const { validateProduct } = require('../middlewares/productValidation') */

const { createBag, getBag } = require('../service/bag.service')

const route = express.Router();

route.post('/bag', /* tokenValidation, */ /* validateProduct, */ async (req, res) => {
    const bag = {
        user: req.body.user,
        products: req.body.products,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        sold: req.body.sold
    }
    createBag(bag)
        .then(bag => res.json(bag))
        .catch(error => res.status(400).json({ message: error.message }))
});

route.get('/bag', /* tokenValidation, */ /* validateProduct, */ async (req, res) => {
    getBag()
        .then(bag => res.json(bag))
        .catch(error => res.status(400).json({ message: error.message }))
});


module.exports = route;