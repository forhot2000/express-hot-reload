// import { readdir } from 'fs/promises';
// import { resolve } from 'path';

export async function loadControllers(app) {
  let controllers = [];
  if (typeof __webpack_require__ === 'function') {
    const r = require.context('./controllers', true, /\.(ts|js)$/);
    // console.log(r.keys());
    const s = r.keys();
    // console.log(s);
    s.forEach((k) => {
      const module = r(k);
      if (module && module.default) {
        const router = module.default;
        const path = getRouterPath(k);
        controllers.push({ path, router });
      }
    });
    controllers.sort((a, b) => -a.path.localeCompare(b.path));
  } else {
    // try {
    //   // 注意，这里应该是扫描 src 目录，而不是 dist 目录
    //   const files = await readdir(resolve('./src/controllers'));
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const name = file.substring(0, file.length - 3); // remove ext '.js'
    //     const module = await import('./controllers/' + name);
    //     controllers.push({ path: `/${name}`, router: module.default });
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  }
  for (const { path, router } of controllers) {
    console.log('mount controller %s', path);
    app.use(path, router);
  }
}

function getRouterPath(k) {
  k = k.substring(1, k.lastIndexOf('.'));
  if (k === '/index') k = '/';
  if (k.endsWith('/index')) k = k.substring(0, k.length - '/index'.length);
  return k;
}
