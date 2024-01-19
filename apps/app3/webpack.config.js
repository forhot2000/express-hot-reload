const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: ['./src/main.js'],
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
