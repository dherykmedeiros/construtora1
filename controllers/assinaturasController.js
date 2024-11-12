// controllers/assinaturasController.js
const supabase = require('../supabase');

// Função para adicionar assinatura (já criada antes)
exports.adicionarAssinatura = async (req, res) => {
  const { relatorio_id, cliente_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('relatorio_assinaturas')
      .insert([{ relatorio_id, cliente_id }]);

    if (error) throw error;

    res.status(201).json({ message: 'Assinatura adicionada com sucesso!', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar assinatura', error: error.message });
  }
};

// Função para consultar assinaturas de um relatório específico
exports.consultarAssinaturas = async (req, res) => {
  const { relatorio_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('relatorio_assinaturas')
      .select('*')
      .eq('relatorio_id', relatorio_id);

    if (error) throw error;

    res.status(200).json({ message: 'Assinaturas encontradas', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar assinaturas', error: error.message });
  }
};

// Função para consultar todas as assinaturas
exports.consultarTodasAssinaturas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('relatorio_assinaturas')
      .select('*');

    if (error) throw error;

    res.status(200).json({ message: 'Todas as assinaturas encontradas', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar todas as assinaturas', error: error.message });
  }
};
