const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.svg/,
      loader: "file-loader",
      // loader: "svg-inline-loader",
      options: {
          // Ensure [path] is included in output file paths
          // This causes `manifest.json` to include full paths as asset keys,
          // which are then used by the server to discover assets in jinja templates
          // name: "[path][name].[hash].[ext]"
          name: "[name].[hash].[ext]"
      },
      exclude: /node_modules/
    },{
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  mode: 'development'
};
