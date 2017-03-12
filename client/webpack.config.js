var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './components/login-form.jsx',
  output: {
    path: __dirname + '/build', 
    filename: 'bundle.js'
  },
  watch: true,
  module: {
  loaders: [
   {
    test: /.jsx?$/,
    loader: 'babel-loader',
    exclude: /node-modules/,
    query: {
     presets: ['es2015', 'react']
    }
   }
  ]
  },
};﻿
