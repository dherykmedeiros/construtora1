const supabase = require('../supabase.js');

// Obter todos os usuários
exports.getUsuarios = async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) return res.status(500).json({ error: error.message });
  
  res.status(200).json(data);
};

// Criar novo usuário
exports.createUsuario = async (req, res) => {
  const { nome, email, nome_usuario, senha, cpf, funcao, obra_id } = req.body;
  
  console.log("Dados recebidos para criação:", req.body); // Para debugar o payload

  const {error} = await supabase
    .from('usuarios')
    .insert([{ nome, email, nome_usuario, senha, cpf, funcao, obra_id }]);

  if (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log('Usuário criado com sucesso:');
  return res.status(201).json({message:'Usuário criado com sucesso:'}); // Retorna o usuário criado com status 201
};

// Editar usuário
exports.updateUsuario = async (req, res) => {
  const { id } = req.params; // ID do usuário a ser atualizado
  const { nome, email, nome_usuario, senha, cpf, funcao, obra_id } = req.body;

  const {error} = await supabase
    .from('usuarios')
    .update({ nome, email, nome_usuario, senha, cpf, funcao, obra_id })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

 
  res.status(200).json({message:'Usuário atualizado com sucesso:'});
};

// Deletar usuário
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params; // ID do usuário a ser deletado
  
  const {error} = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'Usuário deletado com sucesso!' });
};
