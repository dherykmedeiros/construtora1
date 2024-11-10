// controllers/obrasController.js
const supabase = require('../supabase'); // Conexão com o Supabase

// Função para consultar todas as obras
exports.getObras = async (req, res) => {
  try {
    const { data, error } = await supabase.from('obras').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obras', error: error.message });
  }
};

// Função para consultar uma obra específica pelo ID
exports.getObraById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('obras').select('*').eq('id', id).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar obra', error: error.message });
  }
};

// Função para criar uma nova obra
exports.createObra = async (req, res) => {
  try {
    const { nome, endereco, data_inicio, previsao_finalizacao } = req.body;
    const { data, error } = await supabase.from('obras').insert([
      { nome, endereco, data_inicio, previsao_finalizacao }
    ]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar obra', error: error.message });
  }
};

// Função para atualizar uma obra pelo ID
exports.updateObra = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, data_inicio, previsao_finalizacao } = req.body;
    const { data, error } = await supabase.from('obras').update({
      nome, endereco, data_inicio, previsao_finalizacao
    }).eq('id', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar obra', error: error.message });
  }
};

// Função para deletar uma obra pelo ID
exports.deleteObra = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('obras').delete().eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: 'Obra deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar obra', error: error.message });
  }
};
