// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota para obter todos os usuários
router.get('/', usuariosController.getUsuarios);

// Rota para criar um novo usuário
router.post('/', usuariosController.createUsuario);

// Rota para editar um usuário
router.put('/:id', usuariosController.updateUsuario);

// Rota para deletar um usuário
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
