const express = require('express');

/* const { tokenValidation } = require('../middlewares/tokenValidation'); */
/* const { validateProduct } = require('../middlewares/productValidation') */
const nodemailer = require('nodemailer');

const emailconfig = process.env.EMAIL_ADDRESS
const passwordconfig = process.env.EMAIL_PASSWORD

const route = express.Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: emailconfig,
        pass: passwordconfig
    }
});


route.post('/send', /* tokenValidation, */ /* validateProduct, */ async (req, res) => {

    const mailOptions = {
        from: emailconfig,
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Erro ao enviar o email');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Email enviado com sucesso');
        }
    });
});


module.exports = route;