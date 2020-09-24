const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  stats: 'verbose',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // libraryTarget: 'var',
    // library: 'Client'
  },
  devServer: {
    // webpack-dev-server setup
    host: 'localhost',
    port: 8080,
    proxy: {
      // The frontend code uses the backend to store
      // data. webpack-dev-server fails at this. Hence,
      // redirecting frontend api requests to a different port.
      context: () => true,
      target: 'http://localhost:8081',
      secure: false
    }
  },
  module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
            // 'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
        })
        // new WorkboxPlugin.GenerateSW()
    ]
};
