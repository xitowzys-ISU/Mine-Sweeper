var path = require('path');

module.exports = {
  mode: 'development', //production
  entry: './app/CommonJs/Build.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.min.js'
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
};