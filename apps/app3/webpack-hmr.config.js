const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['webpack/hot/poll?100', './src/main.js'],
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'server.js', autoRestart: false }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
