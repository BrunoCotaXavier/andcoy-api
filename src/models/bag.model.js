module.exports = (sequelize, DataTypes) => {
    const Bag = sequelize.define('Bag', {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        products: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sold: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Bag;
};