module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      rua: {
        type: DataTypes.STRING,
      },
      cep: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      number_home: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    return User;
  };