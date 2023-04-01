const db = require('../models/index')

const getFindById = async (id) => {
    try {
        const user = await db.User.findByPk(id)
        return user;
    } catch (error) {
        throw new Error('Erro ao procurar unico usuario: ' + error);
    }
}

module.exports = { getFindById }