const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

/** @type {webpack.Configuration} */
module.exports = {
  mode: 'production',
  entry: ['./src/main.js'],
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  optimization: {
    minimize: false,
  },
};
