const stripe = require('stripe')('sk_test_51N1MMIJSdPTSZCmKlT2pytw3D9WDKhh27ujCx9Er41FwpbAArkEHl6VSRYjtrWlVOKxIVsVO1mNNsEGChCv4w1XS00XWW6mqw1');
const express = require('express');
const { getProductById } = require('../service/product.service');
const cors = require('cors');
const path = require('path');

/* const { tokenValidation } = require('../middlewares/tokenValidation');
const { validateProduct } = require('../middlewares/productValidation') */

const route = express.Router();

const YOUR_DOMAIN = process.env.FRONTEND_URL;

route.post('/create-checkout-session', cors(), async (req, res) => {
    const data = {
        id: req.body.id,
        email: req.body.email,
        frete: req.body.frete,
        cep: req.body.cep,
        number: req.body.number,
        complement: req.body.complement,
    }
    const product = await getProductById(data.id)
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
                        images: [`http://localhost/product/img/${product.dataValues.image}`], // URL da imagem do produto
                    },
                    unit_amount: Math.floor(newPrice * 100)
                },
                quantity: 1,
            },
        ],
        allow_promotion_codes: true,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true&cep=${data.cep}&number=${data.number}&complement=${data.complement}&id=${data.id}`,
        cancel_url: `${YOUR_DOMAIN}/#/produto`,
        payment_intent_data: {
            setup_future_usage: 'on_session',
        },
    });

    res.json({ id: session.id });
});


module.exports = route;