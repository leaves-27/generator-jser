var babelpolyfill = require("babel-polyfill");
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:{
    client:[
      './src/index'
    ]
  },
  devtool:'cheap-source-map',
  module:{
    loaders: [{
      test: /\.js?$/,
      loader:'babel',
      query:{
        presets:["es2015","stage-0","react"]
      },
      exclude: /node_modules/,
      include: path.join(__dirname,"src")
    },
    {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract("style-loader","css-loader!stylus-loader")
    }]
  },
  plugins:[
    new ExtractTextPlugin("bundle.css")
  ],
  output: {
    path: `${__dirname}/build/static`,
    filename: 'bundle.js',
    publicPath:'/static'
  }
};