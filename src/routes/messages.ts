import express from 'express';
import controller from '../controllers/messages';

const router = express.Router();

router.get('/', controller.getMessages);
router.get('/:id', controller.getMessage);
router.put('/:id', controller.updateMessage);
router.delete('/:id', controller.deleteMessage);
router.post('/', controller.addMessage);

export default router;

