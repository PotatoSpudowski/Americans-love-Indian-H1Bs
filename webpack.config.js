const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: './src/content.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ]
}; 