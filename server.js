import express from 'express';


const app = express();
const port = 3000;

// Configura o Express para entender JSON no corpo das requisições
app.use(express.json());

let medias = [
  {
    id: 1,
    title: "One Piece",
    type: "Anime",
    totalEpisodes: 1100,
    currentEpisode: 1050,
    status: "Assistindo"
  }
];
// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'API do Tracker de Séries operante! 🎬' });
});
// 1. READ (GET): Listar todas as mídias cadastradas
app.get('/medias', (req, res) => {
  res.json(medias);
});

// 3. READ (GET): Buscar uma mídia específica pelo ID
app.get('/medias/:id', (req, res) => {
  const { id } = req.params;
  const media = medias.find(m => m.id === parseInt(id));

  if (!media) {
    return res.status(404).json({ error: 'Media not found!' });
  }
  res.json(media);
  
});
// 2. CREATE (POST):  adiciona nova mídia
app.post('/medias', (req, res) => {
  const { title, type, totalEpisodes, currentEpisode, status } = req.body;

  if (!title || !type) {
    return res.status(400).json({ error: 'Title and type are required!' });
  }

  const newId = medias.length > 0 ? medias[medias.length - 1].id + 1 : 1;

  const newMedia = {
    id: newId,
    title,
    type,
    totalEpisodes: totalEpisodes || 0,
    currentEpisode: currentEpisode || 0,
    status: status || 'Planned'
  };

  // Salva no nosso "banco" em memória
  medias.push(newMedia);
  // Responde com o status 201 (Criado com sucesso) e o objeto criado
  res.status(201).json({ message: 'Media registered successfully!', newMedia });
});

// 4. UPDATE (PUT): Atualizar o progresso ou status de uma mídia
app.put('/medias/:id', (req, res) => {
  const { id } = req.params;
  const { currentEpisode, status } = req.body;

  // 4.1. Procura a mídia pelo ID
  const media = medias.find(m => m.id === parseInt(id));

  // 4.2 Se não achar, barra com 404
  if (!media) {
    return res.status(404).json({ error: 'Media not found!' });
  }

  // 4.3 Atualiza apenas os campos que foram enviados
  if (currentEpisode !== undefined) {
    media.currentEpisode = currentEpisode;
  }
  if (status !== undefined) {
    media.status = status;
  }

  // 4.4 Responde com a mídia atualizada
  res.json({ message: 'Progress updated successfully!', media });
});

// 5. DELETE (DELETE): Remover uma mídia do catálogo
app.delete('/medias/:id', (req, res) => {
  const { id } = req.params;

  // 5.1 Procura o índice (posição) do item no array pelo ID
  const index = medias.findIndex(m => m.id === parseInt(id));

  // 5.2 Se o findIndex não achar nada, ele retorna -1
  if (index === -1) {
    return res.status(404).json({ error: 'Media not found!' });
  }

  // 5.3 Remove o item do array usando o splice
  medias.splice(index, 1);

  // 5.4 Responde com sucesso confirmando a remoção
  res.json({ message: 'Media removed successfully!' });
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});