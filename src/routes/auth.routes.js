const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const setHash = require('../components/setHash');
require('dotenv').config();


const { getUserByEmail, getUserById, resetPassword } = require('../service/user.service');

const route = express.Router();

route.post('/login', async (req, res) => {
    const [User] = await getUserByEmail(req.body.email);
    if (!User) {
        return res.status(400).json({ message: "Usuário não encontrado" });
    }
    const validPassword = await bcrypt.compare(req.body.password, User.dataValues.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Senha incorreta" });
    }
    const token = jwt.sign({ id: User.dataValues.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: token, user: User });
});

route.post('/recoverypassword', async (req, res) => {
    const email = req.body.email;
    console.log(email)
    const [user] = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Endereço de e-mail não encontrado" });
    }
    const token = jwt.sign({ id: user.id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
        host: '45.80.153.125',
        port: 465,  
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Redefinir senha',
        html: `
        <p>Olá ${user.name},</p>
        <p>Para redefinir a sua senha, por favor clique no link abaixo:</p>
        <a href="${process.env.FRONTEND_URL}/#/resetpassword/${token}">Redefinir senha</a>
        <br />
        <p>Este link expira em 1 hora.</p>
        <br />
        <p>Atenciosamente,</p>
        <p>Sua equipe de suporte AndCoy.</p>
      `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao enviar e-mail de recuperação de senha" });
        } else {
            console.log('Email enviado: ' + info.response);
            return res.json({ message: "E-mail de recuperação de senha enviado com sucesso" });
        }
    });
});

route.get('/resetpassword/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const { id } = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
        // Renderizar o formulário de redefinição de senha e enviar o ID do usuário
        res.json({ userId: id });
        /* res.render('resetpassword', { userId: id }); */
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
});

route.patch('/resetpassword', async (req, res) => {
    try {
        const hash = await setHash(req.body.password)
        const newPassword = {}
        newPassword.id = req.body.id
        newPassword.password = hash
        resetPassword(newPassword)
            .then(password => res.json(password))
            .catch(error => res.status(401).json({ message: error.message }))


    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error });
    }

});



module.exports = route;