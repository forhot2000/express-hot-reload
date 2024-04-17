import express from 'express';
import { createServer } from 'http';
import { inc } from './count';
import { greet } from './hello';
import { loadControllers } from './loadControllers';

async function bootstrap() {
  const app = express();

  // 默认情况下 express 会自动创建 server，这里手动创建 server
  // 是为了在后面调用 server.close() 关闭旧的服务
  const server = createServer(app);

  // 动态加载 controllers 目录下的所有文件
  await loadControllers(app);

  app.all('*', (req, res) => {
    const n = inc();
    res.send(`${n}: ${greet('boy')}\n`);
  });

  server.listen(3000, function () {
    console.log('listen on http://localhost:3000');
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

bootstrap();
