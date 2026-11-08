import mediaRepository from '../repositories/MediaRepository.js';

export class MediaController {
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
  //3. Cria nova mídia
  createMedia(req, res) {
    const { title, type } = req.body
    if (!title || !type) {
      return res.status(400).json({ error: 'Media cant be created' })
    }
    const createdmedia = mediaRepository.findAllAndCreate(req.body)
    return res.status(201).json(createdmedia)
  }
  //4. Atualiza mídia existente
  updateMedia(req, res) {
    const { id } = req.params;
    const { currentEpisode, status } = req.body;
    const update = mediaRepository.update(id, { currentEpisode, status })
    if (!update) {
      return res.status(404).json({ error: "Media not found" })
    }
    return res.status(200).json(update);
  }
  //5. Deleta Mídia extistente
  deleteMedia(req, res) {
    const { id } = req.params
    const deletedMedia = mediaRepository.delete(id)
    if (!deletedMedia) {
      return res.status(404).json({ error: "Media can't be deleted" })
    }
    return res.status(200).json({ message: 'Media deleted succesfully!' })
  }
}

export default new MediaController();