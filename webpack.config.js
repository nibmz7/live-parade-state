const path = require('path');
const PATH_PROD = 'prod';
const PATH_MOCK = 'docs';

const PROD_CONFIG = {
  entry: './dev/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, PATH_PROD)
  }
};

const MOCK_CONFIG = {
  entry: './dev/main-mock.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, PATH_MOCK)
  }
};

module.exports = [PROD_CONFIG, MOCK_CONFIG];
