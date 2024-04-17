import { Router } from 'express';
import { delay } from '../lib/delay';

console.log('[module] src/controller/posts');

const router = Router();

router.get('/', async (req, res) => {
  await delay(10);
  res.send([
    {
      id: 1,
      title: 'post 1',
      content: 'content of the post',
    },
  ]);
});

export default router;
