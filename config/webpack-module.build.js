const path = require('path');
const baseWebpackConfig = require('./webpack.base');

module.exports = Object.assign({}, baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
});
