const supabase = require('../supabase');
const multer = require('multer');
const upload = multer();

// Função para fazer upload de imagens para o bucket 'imagensRelatorio'
async function uploadImage(file) {
  const filePath = `${Date.now()}_${file.originalname}`;
  const { data, error } = await supabase.storage
    .from('imagensRelatorio')
    .upload(filePath, file.buffer, { contentType: file.mimetype });
  
  if (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }
  
  // Obter a URL pública da imagem
  const { publicURL, error: urlError } = supabase.storage
    .from('imagensRelatorio')
    .getPublicUrl(filePath);
  
  if (urlError) {
    throw new Error(`Erro ao obter URL da imagem: ${urlError.message}`);
  }
  
  return publicURL;
}

// Função para listar todos os relatórios
async function getRelatorios(req, res) {
  try {
    const { data, error } = await supabase.from('relatorios').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter um relatório específico pelo ID
async function getRelatorioById(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('relatorios').select('*').eq('id', id).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para criar um novo relatório com upload de imagens
async function createRelatorio(req, res) {
  const { titulo, texto, obra_id, localizacao, status } = req.body;
  const files = req.files; // Imagens enviadas

  try {
    // Fazer upload de cada imagem e armazenar as URLs em um array
    const imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await uploadImage(file);
        imageUrls.push(imageUrl);
      }
    }

    // Inserir o novo relatório com as URLs das imagens
    const { data, error } = await supabase.from('relatorios').insert([
      { titulo, texto, obra_id, localizacao, imagens: imageUrls, status }
    ]).single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para atualizar um relatório existente
async function updateRelatorio(req, res) {
  const { id } = req.params;
  const { titulo, texto, obra_id, localizacao, imagens, status } = req.body;
  try {
    const { data, error } = await supabase.from('relatorios').update({
      titulo, texto, obra_id, localizacao, imagens, status
    }).eq('id', id).single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para deletar um relatório
async function deleteRelatorio(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('relatorios').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getRelatorios,
  getRelatorioById,
  createRelatorio,
  updateRelatorio,
  deleteRelatorio
};
