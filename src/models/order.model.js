module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id_product: {
            type: DataTypes.STRING,
            allowNull: false
        },
        frete: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vlrMerc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pesoMerc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logradouro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contato: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        peso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        altura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        largura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comprimento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        produto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referencia: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Order;
};