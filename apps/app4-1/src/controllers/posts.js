import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'post 1',
      content: 'content of the post',
    },
  ]);
});

export default router;
