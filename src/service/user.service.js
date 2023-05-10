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

const editRole = async (data) => {
    try {
        const newUser = await db.User.findByPk(data.id) 
        newUser.role = data.role
        newUser.save()
        return newUser;
    } catch (error) {
        throw new Error('Erro ao alterar perfil do usuário: '+ error);
    }
}
 
const editUser = async (data) => {
    try {
        const newUser = await db.User.findByPk(data.id) 
        newUser.name = data.name? data.name : newUser.name
        newUser.email = data.email? data.email : newUser.email
        newUser.cep = data.cep? data.cep : newUser.cep
        newUser.rua = data.rua? data.rua : newUser.rua
        newUser.number = data.number? data.number : newUser.number
        newUser.complement = data.complement? data.complement : newUser.complement
        newUser.save()
        return newUser;
    } catch (error) {
        throw new Error('Erro ao alterar usuário: '+ error);
    }
}

const resetPassword = async (data) => {
    try {
        const newPassword = await db.User.findByPk(data.id) 
        if(!newPassword){
            throw new Error('Usuario não existe');
        }
        newPassword.password = data.password? data.password : data.password
        newPassword.save()
        console.log(newPassword)
        return newPassword;
    } catch (error) {
        throw new Error('Erro ao alterar senha: '+ error);
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

const getUserById = async (id) => {
    try {
        const user = await db.User.findByPk(id)
        return user;
    } catch (error) {
        return ('Erro ao procurar usuario por id: '+ error);
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
                role: {[db.Sequelize.Op.in]: [2, 3]},
            }
        })
        return user;
    } catch (error) {
        throw new Error('Erro ao listar usuarios: '+ error);
    }
}

const deleteUser = async (data) => {
    try {
        const user = await db.User.findByPk(data.id) 
        return await user.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar usuario: '+ error);
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getAllEmployes,
    editRole,
    editUser,
    resetPassword,
    getUserById,
    deleteUser
}