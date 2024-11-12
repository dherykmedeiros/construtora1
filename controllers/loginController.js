// controllers/loginController.js
const supabase = require('../supabase.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY; // Use uma chave segura e forte

// Função de login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  // Busca o usuário no banco de dados usando o e-mail
  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email);

  if (error || usuarios.length === 0) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const usuario = usuarios[0];

  // Verifica se a senha enviada é igual à senha armazenada
  if (senha !== usuario.senha) {
    return res.status(400).json({ error: 'Senha incorreta' });
  }

  // Gera um token JWT com o ID do usuário
  const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });

  // Retorna o token, nome e função do usuário
  res.status(200).json({
    message: 'Login bem-sucedido',
    token,
    nome: usuario.nome,
    funcao: usuario.funcao
  });
};
