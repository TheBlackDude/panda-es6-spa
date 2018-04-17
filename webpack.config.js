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
    host: '0.0.0.0',
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
