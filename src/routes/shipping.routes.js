const express = require('express');
const route = express.Router();
const { shippingValidation } = require('../middlewares/shippingValidation');
const { createShipping, simulationShipping } = require('../service/shipping.service.js');
const { simulationValidation } = require('../middlewares/simulationValidation');

route.post('/solicitar', /* shippingValidation, */ createShipping);

route.post('/simular', /* simulationValidation, */ simulationShipping);

route.post('/rastreio' /* simulationValidation, */ );


module.exports = route;