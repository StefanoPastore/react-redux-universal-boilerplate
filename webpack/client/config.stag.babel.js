import webpack from 'webpack';
import config from './config.babel';

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('staging')
    }
  })
);

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
  }, process.env.envMap))
);

export default config;
