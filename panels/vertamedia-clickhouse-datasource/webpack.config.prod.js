const baseWebpackConfig = require('./webpack.config');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

baseWebpackConfig.mode = 'production';

baseWebpackConfig.plugins.push(new NgAnnotatePlugin());
baseWebpackConfig.plugins.push(
  new UglifyJSPlugin({
    sourceMap: true,
  })
);

module.exports = baseWebpackConfig;
