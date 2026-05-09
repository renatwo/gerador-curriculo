const { Router } = require('express');
const CurriculoController = require('./controllers/CurriculoController');

const routes = new Router();

routes.post('/api/curriculos', CurriculoController.store);
routes.get('/api/curriculos', CurriculoController.index);
routes.get('/api/curriculos/:id', CurriculoController.show);
routes.put('/api/curriculos/:id', CurriculoController.update);
routes.delete('/api/curriculos/:id', CurriculoController.delete);
routes.post('/api/curriculos/:id/pdf', CurriculoController.generatePdf);

module.exports = routes;
