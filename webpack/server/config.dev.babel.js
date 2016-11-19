import webpack from 'webpack';
import config from './config.babel';

config.devtool = '#eval-source-map';

config.entry.unshift(
	'webpack/hot/poll?10'
);

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());
config.plugins.push(
  new webpack.DefinePlugin(Object.assign({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }, process.env.envMap))
);

export default config;
