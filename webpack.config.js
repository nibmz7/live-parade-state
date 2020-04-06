const path = require('path');

module.exports = {
  entry: './public/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};