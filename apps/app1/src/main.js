const express = require('express');

function bootstrap() {
  const app = express();

  app.all('*', (req, res) => {
    res.send(`hello, world!\n`);
  });

  app.listen(3000, function () {
    console.log('listen on http://localhost:3000');
  });
}

bootstrap();
