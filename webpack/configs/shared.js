const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => ({
  mode: env.mode,
  entry: path.join(__dirname, '../../src/index.js'),
  output: {
    path: path.join(__dirname, '../../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: [
                  '@babel/preset-env',
                  '@babel/preset-typescript',
              ],
          },
      },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 8192,
              esModule: false,
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
    ],
  },
  resolve: {
    alias: {
      Js: path.resolve(__dirname, '../../src/js/'),
      Styles: path.resolve(__dirname, '../../src/css'),
      Templates: path.resolve(__dirname, '../../src/templates'),
      Node_modules: path.resolve(__dirname, '../../src/node_modules'),
    },
    extensions: ['.ts', '.js', '.css'],
    modules: ['node_modules']
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  
});
