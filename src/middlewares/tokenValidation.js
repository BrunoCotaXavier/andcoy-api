const jwt = require('jsonwebtoken');
const { getFindById } = require('../service/auth.service')
require('dotenv').config();


const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await getFindById(id)
    if (!user) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }
    req.user = user;

    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = { tokenValidation };
