import webpack from 'webpack';
import config from './config.babel';

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
}));
config.plugins.push(
  new webpack.DefinePlugin(Object.assign({
    'process.env.NODE_ENV': JSON.stringify('staging'),
  }, config.envMap))
);

export default config;
