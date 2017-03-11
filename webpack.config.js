var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/javascripts/login-form.jsx',
  output: { path: path.resolve(__dirname, 'public', 'javascripts'), filename: 'bundle.js' },
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