var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname + '/build', 
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  watch: true,
  module: {
    loaders: [
     {
      loader: 'babel-loader',
      exclude: /node-modules/,
      query: {
       presets: ['es2015', 'react']
      }
     }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};﻿
