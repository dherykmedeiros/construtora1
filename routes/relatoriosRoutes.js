const express = require('express');
const { 
  getRelatorios, 
  getRelatorioById, 
  createRelatorio, 
  updateRelatorio, 
  deleteRelatorio 
} = require('../controllers/relatoriosController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/', getRelatorios);
router.get('/:id', getRelatorioById);
router.post('/', upload.array('imagens'), createRelatorio); // Suporte para upload de várias imagens
router.put('/:id', updateRelatorio);
router.delete('/:id', deleteRelatorio);

module.exports = router;
