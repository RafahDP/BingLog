import mediaRepository from '../repositories/MediaRepository.js';

class MediaController {
  // 1. Listar todas as mídias
  getAll(req, res) {
    const medias = mediaRepository.findAll();
    return res.json(medias);
  }
// 2. Buscar uma mídia específica pelo ID
  getById(req, res) {
    const { id } = req.params;
    const media = mediaRepository.findById(id); // <-- O repositório faz o trabalho pesado!

    if (!media) {
      return res.status(404).json({ error: 'Media not found!' });
    }

    return res.json(media);
  }
}

export default new MediaController();