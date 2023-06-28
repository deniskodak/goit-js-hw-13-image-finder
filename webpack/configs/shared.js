const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require(path.join(__dirname, '../../package.json'));

module.exports = env => ({
  mode: env.mode,
  entry: path.join(__dirname, '../../src/index.js'),
  output: {
    path: path.join(__dirname, '../../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
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
    extensions: ['.js', '.css'],
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'ImageFinderApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ImageFinder': './src/js/index.js',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
  ],
});
