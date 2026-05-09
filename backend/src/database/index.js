const { Sequelize } = require('sequelize');
const path = require('path');

// Inicializando o Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '..', '..', 'database.sqlite'),
  logging: false, // Desabilitar logs no console para manter limpo
});

module.exports = sequelize;
