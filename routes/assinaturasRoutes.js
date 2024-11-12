// routes/assinaturasRoutes.js
const express = require('express');
const router = express.Router();
const assinaturasController = require('../controllers/assinaturasController');

router.post('/', assinaturasController.adicionarAssinatura);
router.get('/:relatorio_id', assinaturasController.consultarAssinaturas); // Para buscar assinaturas de um relatório específico
router.get('/', assinaturasController.consultarTodasAssinaturas); // Para buscar todas as assinaturas

module.exports = router;
