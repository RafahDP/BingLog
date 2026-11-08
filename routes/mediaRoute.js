import { Router } from 'express';
import mediaController from '../src/resources/MediaController.js';

const router = Router();

router.get('/medias', mediaController.getAll)
router.post('/medias',mediaController.createMedia)
router.put('/medias/:id', mediaController.updateMedia)
router.delete('/medias/:id', mediaController.deleteMedia)

export default router;