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
      role: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      rua: {
        type: DataTypes.STRING,
      },
      cep: {
        type: DataTypes.STRING,
        
      },
      number_home: {
        type: DataTypes.STRING,
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