const jwt = require('jsonwebtoken');
const { getFindById } = require('../service/auth.service')

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const { id } = jwt.verify(token, 'DAf3m73*b7HbK4CS.ghOO7sIbVoyFlrk5ElK2ECuuYCJaX1U0SxafYnCp');

    const user = await getFindById(id)
    if (!user) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }
    console.log(user)
    req.user = user;

    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = { tokenValidation };
