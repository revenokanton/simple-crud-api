const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  module: {
    rules: [{ test: /\.graphql|\.gql$/, loader: 'webpack-graphql-loader' }],
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  target: 'node',
  devtool: 'source-map',
  entry: [path.join(__dirname, '../index.js')],
  externals: [nodeExternals({})],
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
};
