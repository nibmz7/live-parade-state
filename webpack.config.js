const path = require('path');
const MAIN_DIR = 'prod';

module.exports = {
  entry: './dist/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, MAIN_DIR)
  }
};
