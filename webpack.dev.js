const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
// const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    server: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   // Loads the javacript into html template provided.
      //   // Entry point is set below in HtmlWebPackPlugin in Plugins
      //   test: /\.html$/,
      //   use: [{ loader: "html-loader" }]
      // }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new Dotenv({
    //   path: `./.env`
    // })
    // new HtmlWebPackPlugin({
    //   template: "./index.html",
    //   filename: "./index.html",
    //   excludeChunks: ['server']
    // })
  ],
  experiments: {
    topLevelAwait: true
  },
  devServer: {
    port: 3080,
    static: './dist'
  },
};
