const baseWebpackConfig = require('./webpack.base.conf');

var conf = baseWebpackConfig;
conf.mode = 'production';

module.exports = baseWebpackConfig;
