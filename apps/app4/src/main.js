import express from 'express';
import { readdir } from 'fs/promises';
import { createServer } from 'http';
import { resolve } from 'path';
import { inc } from './count';
import { greet } from './hello';

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

async function loadControllers(app) {
  try {
    // 注意，这里应该是扫描 src 目录，而不是 dist 目录
    const files = await readdir(resolve('./src/controllers'));
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = file.substring(0, file.length - 3); // remove ext '.js'
      const module = await import('./controllers/' + name);
      app.use(`/${name}`, module.default);
    }
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
