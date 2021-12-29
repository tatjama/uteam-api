import express from 'express';
import controller from '../controllers/messages';

const router = express.Router();

router.all('/', controller.getMessage);

export default router;

