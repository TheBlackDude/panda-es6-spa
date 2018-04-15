/*
 * Webpack Config file
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    dom: './src/dom.js',
    app: './src/controller.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    port: 9000
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
