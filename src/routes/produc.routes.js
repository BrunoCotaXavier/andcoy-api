const multer = require('multer');
const path = require('path');
const fs = require('fs');

const express = require('express');

const { tokenValidation } = require('../middlewares/tokenValidation');
const { validateProduct } = require('../middlewares/productValidation')
const { createProduct, getAllProducts, deleteProduct, editProduct, removeOne } = require('../service/product.service');

const route = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb, next) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    },
})

const upload = multer({ storage });

route.post('/product', /* tokenValidation, */ upload.fields([{ name: 'imagem' }]) , validateProduct, async (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.files.imagem[0].filename
    }
    createProduct(product)
        .then(product => res.json(product))
        .catch(error => res.status(400).json({ message: error.message }))
});

route.get('/product/all', /* tokenValidation, */(req, res) => {
    getAllProducts()
        .then(products => res.json(products))
        .catch(error => res.status(401).json({ message: error.message }))
});

route.get('/product/img/:image', /* tokenValidation, */(req, res) => {
    const image = req.params.image
    const pathProject = path.resolve(__dirname, '../../')
    const imgPath = pathProject + `/public/images/${image}`
    if (!fs.existsSync(imgPath)) {
        res.status(404).send('Imagem não encontrada');
        return;
    }
    res.sendFile(imgPath);
});

route.delete('/product/:id', /* tokenValidation, */(req, res) => {
    const product = {}
    product.id = req.params.id
    deleteProduct(product)
        .then(product => res.json(product))
        .catch(error => res.status(401).json({ message: error.message }))
});

route.patch('/product', /* tokenValidation, */(req, res) => {
    const product = {}
    product.id = req.body.id
    product.name = req.body.name ? req.body.name : null
    product.description = req.body.description ? req.body.description : null
    product.price = req.body.price ? req.body.price : null
    product.quantity = req.body.quantity ? req.body.quantity : null
    editProduct(product)
        .then(product => res.json(product))
        .catch(error => res.status(401).json({ message: error.message }))
});

route.patch('/product/remove', /* tokenValidation, */(req, res) => {
    const product = {}
    product.id = req.body.id
    removeOne(product)
        .then(product => res.json(product))
        .catch(error => res.status(401).json({ message: error.message }))
});


module.exports = route;