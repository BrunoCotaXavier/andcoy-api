
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'andcoy38_db',
    'andcoy38_root',
    'Biel2326@', {
    host: '192.185.176.94',
    dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);

module.exports = db;