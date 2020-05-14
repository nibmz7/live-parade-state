const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  entry: './public/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['main.js'],
      rules: [{
        search: /\/\*minify-html\*\/(.*?)\/\*end\*\//gms,
        replace: function (match) {
          let htmlString = match.replace(/^\s+/gm, '');
          htmlString = htmlString.replace(/\s\s*$/gm, '');
          htmlString = htmlString.replace(/\r?\n|\r/g, '');
          htmlString = htmlString.replace(/\/\*(minify-html|end)\*\//gms, '');
          return htmlString;
        }
      }]
    }])
  ]
};