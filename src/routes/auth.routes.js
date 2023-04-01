const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserByEmail } = require('../service/user.service');

const route = express.Router(); 

route.post('/login', async (req, res) => {
    const [ User ] = await getUserByEmail(req.body.email);
    if (!User) {
        return res.status(400).json({ message: "Usuário não encontrado" });
    }
    const validPassword = await bcrypt.compare(req.body.password, User.dataValues.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Senha incorreta" });
    }
    const token = jwt.sign({ id: User.dataValues.id }, 'DAf3m73*b7HbK4CS.ghOO7sIbVoyFlrk5ElK2ECuuYCJaX1U0SxafYnCp', { expiresIn: '1h' });
    res.json({ token: token });
});

module.exports = route;