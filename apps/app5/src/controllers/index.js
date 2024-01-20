const controllerNames = [
  // format
  'posts',
  'users',
];

export async function loadControllers(app) {
  const controllers = controllerNames.map((name) => ({ name }));
  for (let i = 0; i < controllers.length; i++) {
    const controller = controllers[i];
    try {
      const module = await import(`./${controller.name}`);
      controller.router = module.default;
    } catch (err) {
      // console.error(err);
    }
  }

  controllers.forEach(({ name, router }) => {
    if (router) {
      const path = `/${name}`;
      app.use(path, router);
      console.log(`mount controller '${name}' on '${path}'`);
    } else {
      console.error(`cannot find controller '${name}'`);
    }
  });
}
