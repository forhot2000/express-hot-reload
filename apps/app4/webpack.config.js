const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/main.js'],
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
