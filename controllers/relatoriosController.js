// controllers/relatoriosController.js
const supabase = require('../supabase');
const multer = require('multer');
const upload = multer();

// Função para fazer upload de imagens para o bucket 'imagensRelatorio'
async function uploadImage(arquivos) {
  const urlsImagens = [];

  for (const arquivo of arquivos) {
    const nomeArquivo = `${Date.now()}-${arquivo.originalname}`;
    const { data, error } = await supabase
      .storage
      .from('imagensRelatorio')
      .upload(nomeArquivo, arquivo.buffer, {
        contentType: arquivo.mimetype
      });

    if (error) {
      console.error(`Erro ao fazer upload da imagem ${arquivo.originalname}:`, error.message);
      return []; // Retorna array vazio em caso de erro
    }

    // Obter a URL pública da imagem
    const { data: publicUrlData, error: urlError } = await supabase
      .storage
      .from('imagensRelatorio')
      .getPublicUrl(nomeArquivo);

    if (urlError || !publicUrlData) {
      console.error(`Erro ao obter URL da imagem ${arquivo.originalname}:`, urlError ? urlError.message : 'Public URL is undefined');
      return [];
    }

    urlsImagens.push(publicUrlData.publicUrl);
  }
  return urlsImagens;
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
  const files = req.files;

  try {
    // Fazer upload de cada imagem e armazenar as URLs em um array
    let imageUrls = [];
    if (files && files.length > 0) {
      imageUrls = await uploadImage(files);
      if (imageUrls.length === 0) throw new Error('Erro no upload das imagens');
    }

    // Inserir o novo relatório com as URLs das imagens
    const { data, error } = await supabase.from('relatorios').insert([
      {
        titulo,
        texto,
        obra_id,
        localizacao,
        imagens: imageUrls,  // Certifique-se de que a coluna `imagens` é um array de texto (`text[]`) no banco
        status
      }
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
      titulo,
      texto,
      obra_id,
      localizacao,
      imagens,
      status
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
