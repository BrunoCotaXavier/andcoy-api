/* const stripe = require('stripe')('sk_test_51N1MMIJSdPTSZCmKlT2pytw3D9WDKhh27ujCx9Er41FwpbAArkEHl6VSRYjtrWlVOKxIVsVO1mNNsEGChCv4w1XS00XWW6mqw1'); */
const stripe = require('stripe')('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');
const express = require('express');
const { getProductById } = require('../service/product.service');
const { createOrder } = require('../service/order.service');
const cors = require('cors');
const path = require('path');

/* const { tokenValidation } = require('../middlewares/tokenValidation');
const { validateProduct } = require('../middlewares/productValidation') */

const route = express.Router();

const YOUR_DOMAIN = process.env.FRONTEND_URL;

route.post('/create-checkout-session', cors(), async (req, res) => {
    /* const data = {
        id: req.body.id,
        email: req.body.email,
        frete: req.body.frete,
        cep: req.body.cep,
        number: req.body.number,
        complement: req.body.complement,
    } */
    const data = req.body
    const product = await getProductById(data.id_product)
    const frete = parseFloat(data.frete)
    const newPrice = frete + parseFloat(product.dataValues.price)

    const session = await stripe.checkout.sessions.create({
        customer_email: data.email,
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: product.dataValues.name,
                        images: [`http://localhost:8080/product/img/${product.dataValues.image}`], // URL da imagem do produto
                    },
                    unit_amount: Math.floor(newPrice * 100)
                },
                quantity: 1,
            },
        ],
        allow_promotion_codes: true,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true&id_order=${data.id_order}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true&id_order=${data.id_order}`,
        payment_intent_data: {
            setup_future_usage: 'on_session',
        },
    });

    res.json({ id: session.id });
});


module.exports = route;