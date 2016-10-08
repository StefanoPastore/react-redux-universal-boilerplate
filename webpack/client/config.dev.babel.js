import webpack from 'webpack';
import path from 'path';
import config from './config.babel';

config.entry.push(`webpack-hot-middleware/client?path=${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/__webpack_hmr`);

config.devtool = 'source-map';

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());
config.plugins.push(
  new webpack.DefinePlugin(Object.assign({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }, process.env.envMap))
);

export default config;
