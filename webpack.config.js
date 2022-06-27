const path = require('path');

const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

const isLocal = process.env.STAGE === 'dev';

module.exports = {
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'source-map' : undefined,
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: ['.mjs', '.ts', '.js', '.json'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    pathinfo: false,
  },
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, '.webpack'),
          path.resolve(__dirname, '.serverless'),
        ],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalFileCaching: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  cache: true,
};
