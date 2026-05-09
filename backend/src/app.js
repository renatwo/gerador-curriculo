const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json({ limit: '10mb' })); // Para suportar fotos em base64
    this.server.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }

  async database() {
    try {
      await sequelize.sync();
      // console.log('Banco de dados sincronizado');
    } catch (error) {
      // console.error('Erro ao sincronizar banco:', error);
    }
  }
}

module.exports = new App().server;
