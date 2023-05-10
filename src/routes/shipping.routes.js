const express = require('express');
const route = express.Router();

const Correios = require('node-correios');

const correios = new Correios();

const {
    calcularPrecoPrazo,
    consultarCep,
    rastrearEncomendas,
} = require('correios-brasil');


route.post('/etiqueta', async (req, res) => {

    const shipping = {
        cep: req.body.cep,
        number: req.body.number,
        complement: req.body.complement,
    }

    consultarCep(shipping.cep).then(dataCep => {
        let args = {
            sCepOrigem: '08040460',
            sCepDestino: shipping.cep,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nCdServico: [/* '04014',  */'04510'],
            nVlDiametro: '0',
        };
        dataCep.complemento = shipping.complement
        calcularPrecoPrazo(args).then(dataPrazo => {
            res.json({ dataCep, dataPrazo })
        });
    });


});

module.exports = route;