var config = require('../../webpack/client/config.dev');

module.exports = {
  resolve: config.resolve,
  module: {
    loaders: [
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader?minimize&sourceMap&modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader',
      },
    ],
  },
  postcss: config.postcss,
  sassLoader: config.sassLoader,
};
