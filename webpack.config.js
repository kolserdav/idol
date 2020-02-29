const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Uglify = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const express = require('express');


module.exports = {
	 entry: {
    module: "./src/js/module.js",
  },
  output: {
    filename: 'js/[name].[hash:16].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new Uglify()
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            presets: [
            "@babel/preset-env"
            ]
        },
        exclude: /node_modules/
	    },
	    {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]',
            outputPath: 'images/',
            publicPath: 'images'
        }
	    },
	    {
        test: /\.(scss|css)$/i,
        use: [
        	'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
  		filename: (process.env.NODE_ENV !== 'development')? 'index_EN.html' : 'index.html',
      template: './src/index.html',
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: (process.env.NODE_ENV !==  'development')? 'index_RU.html' : 'index.html',
      template: './src/ru/index.html',
      minify: true
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: 8088,
    hot: true,
    inline: true,
    before: function(app) {
      app.use('/static', express.static('src/static'));
    },
  }
};
