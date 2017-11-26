var path = require('path');

var JS_DIR = path.resolve(__dirname, 'js');

module.exports = options => {
  return {
    entry: JS_DIR + '/source/app.js',
    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
  }
}
