const db = require('../models/index')

const createUser = async (data) => {
    try {
        const newUser = await db.User.create({
            name: data.name,
            email: data.email,
            rua: data.rua,
            cep: data.cep,
            number_home: data.number_home,
            complement: data.complement,
            password: data.password
        })
        return newUser;
    } catch (error) {
        throw new Error('Erro ao criar usuário: '+ error);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await db.User.findAll({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        throw new Error('Erro ao procurar usuario por email: '+ error);
    }
}

const getAllUsers = async (name) => {
    try {
        const user = await db.User.findAll()
        return user;
    } catch (error) {
        throw new Error('Erro ao listar usuarios: '+ error);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers
}