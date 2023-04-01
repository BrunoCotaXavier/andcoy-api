const express = require('express');
const bcrypt = require('bcrypt');

const { validateUser } = require('../middlewares/userValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const { createUser } = require('../service/user.service');
const { getAllUsers } = require('../service/user.service');

const setHash = require('../components/setHash');

const route = express.Router();

route.post('/users', tokenValidation, validateUser, async (req, res) => {
    const hash = await setHash(req.body.password)
    const user = {
        name: req.body.name,
        email: req.body.email,
        rua: req.body.rua,
        cep: req.body.cep,
        number_home: req.body.number_home,
        complement: req.body.complement,
        password: hash
    }
    createUser(user)
        .then(user => res.json(user))
        .catch(error => res.status(400).json({ message: error.message }))
});

route.get('/users/all', tokenValidation, (req, res) => {
    getAllUsers()
        .then(user => res.json(user))
        .catch(error => res.status(401).json({ message: error.message }))
});


module.exports = route;