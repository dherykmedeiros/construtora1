// routes/obrasRoutes.js
const express = require('express');
const router = express.Router();
const obrasController = require('../controllers/obrasController');

// Rota para consultar todas as obras
router.get('/', obrasController.getObras);

// Rota para consultar uma obra específica pelo ID
router.get('/:id', obrasController.getObraById);

// Rota para criar uma nova obra
router.post('/', obrasController.createObra);

// Rota para atualizar uma obra pelo ID
router.put('/:id', obrasController.updateObra);

// Rota para deletar uma obra pelo ID
router.delete('/:id', obrasController.deleteObra);

module.exports = router;
