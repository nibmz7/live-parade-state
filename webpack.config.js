const path = require('path');
const MAIN_DIR = 'prod/beta'

module.exports = {
  entry: './dist/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, MAIN_DIR)
  }
};