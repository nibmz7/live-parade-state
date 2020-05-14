const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  entry: './public/main.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['main.js','login-screen.js','user-screen.js','admin-screen.js','admin-screen~user-screen.js'],
      rules: [{
        search: /`(.*?)`/gms,
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