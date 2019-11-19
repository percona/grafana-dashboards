const path = require('path');
const webpack = require('webpack');
const moment = require('moment');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginBase = new ExtractTextPlugin('./css/panel.base.css');
const ExtractTextPluginLight = new ExtractTextPlugin('./css/panel.light.css');
const ExtractTextPluginDark = new ExtractTextPlugin('./css/panel.dark.css');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const packageJson = require('../package.json');

module.exports = {
  target: 'node',
  context: resolve('src/pmm-qan-app-panel-new/'),
  entry: './module.tsx',
  output: {
    filename: 'module.js',
    path: resolve('dist'),
    libraryTarget: 'amd',
  },
  externals: [
    // remove the line below if you don't want to use buildin versions
    'jquery',
    'lodash',
    'moment',
    'react',
    'react-dom',
    '@grafana/ui',
    '@grafana/data',
    '@grafana/runtime',
    function(context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    },
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([{ from: '../README.md' }, { from: 'plugin.json' }]),
    new ReplaceInFileWebpackPlugin([
      {
        dir: 'dist',
        files: ['plugin.json'],
        rules: [
          {
            search: '%VERSION%',
            replace: packageJson.version,
          },
          {
            search: '%TODAY%',
            replace: moment().format('YYYY.MM.DD'),
          },
        ],
      },
    ]),
    ExtractTextPluginBase,
    ExtractTextPluginLight,
    ExtractTextPluginDark,
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.base\.(s?)css$/,
        use: ExtractTextPluginBase.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.light\.(s?)css$/,
        use: ExtractTextPluginLight.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.dark\.(s?)css$/,
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        // exclude: [`light.less`, `dark.less`],
      },
      {
        test: /\.less$/,
        use: ExtractTextPluginDark.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
        // exclude: [`light.less`, `dark.less`],
      },
    ],
  },
};
