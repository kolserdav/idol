const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Uglify = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

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
            presets: ["@babel/preset-env"]
        },
        exclude: /node_modules/
	    },
	    {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: 'images/[name].[ext]?[hash]'
        }
	    },
	    {
        test: /\.scss$/i,
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
  		filename: 'index.html',
      template: './src/index.html',
      minify: true
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    stats: "normal",
    host: "localhost",
    port: 8088,
    open: true,
    hot: true,
    inline: true
  }
};
