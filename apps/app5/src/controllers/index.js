const controllers = [
  // format
  'posts',
];

export async function loadControllers() {
  return Promise.all(
    controllers.map((name) =>
      import(`./${name}`).then((module) => ({
        name,
        router: module.default,
      })),
    ),
  );
}
