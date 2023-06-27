const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8002/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
      minify: false,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    port: 8002,
    static: {
      directory: path.resolve(__dirname, '../../dist'),
    },
    historyApiFallback: {
      index: 'index.html',
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
});
