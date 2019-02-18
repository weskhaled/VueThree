const path = require('path')
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        THREE: 'three',
      }),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
  }
}