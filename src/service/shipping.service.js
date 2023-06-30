const axios = require('axios');
const db = require('../models/index');
const token = '11a849153f6781180e28de34ebfbcdb9c399170ebdc1279a717f07cf1d50e6df'
const URL_API = 'https://portal.kangu.com.br/tms/transporte'

const createShipping = async (req, res) => {
    try {
        const randomNumber = Math.floor(Math.random() * 10000);
        const ticket = req.body
        ticket.pedido.numeroCli = `${Date.now()}${randomNumber}`
        axios.post(URL_API + '/solicitar', ticket, { headers: { "token": token } })
            .then((response) => {
                res.send(response.data)
            })
            .catch((error) => {
                res.send(error.response.data)
            })
    } catch (error) {
        throw new Error('Erro ao criar pedido na Kangu: ' + error);
    }
}

const simulationShipping = async (req, res) => {
    try {
        const ticket = req.body
        axios.post(URL_API + '/simular', ticket, { headers: { "token": token } })
            .then((response) => {
                res.json(response.data)
            })
            .catch((error) => {
                res.json(error.response.data)
            })
    } catch (error) {
        throw new Error('Erro ao simular pedido na Kangu: ' + error);
    }
}


module.exports = {
    createShipping,
    simulationShipping,
}