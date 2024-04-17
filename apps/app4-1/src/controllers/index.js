import { Router } from 'express';
import { delay } from '../lib/delay';

console.log('[module] src/controller');

const router = Router();

router.get('/', async (req, res) => {
  await delay(10);
  res.send('welcome');
});

export default router;
