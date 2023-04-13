const db = require('../models/index')

const createUser = async (data) => {
    try {
        const newUser = await db.User.create({
            name: data.name,
            email: data.email,
            role: data.role,
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
        return ('Erro ao procurar usuario por email: '+ error);
    }
}

const getAllUsers = async () => {
    try {
        const user = await db.User.findAll({
            where: {
                role: 1
            }
        })
        return user;
    } catch (error) {
        throw new Error('Erro ao listar usuarios: '+ error);
    }
}

const getAllEmployes = async () => {
    try {
        const user = await db.User.findAll({
            where: {
                role: 3
            }
        })
        return user;
    } catch (error) {
        throw new Error('Erro ao listar usuarios: '+ error);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getAllEmployes
}