import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import common from '../common.babel';

const envMap = ((env) => {
  const obj = {};

  Object.keys(env).forEach((key) => {
    obj[`process.env.${key}`] = JSON.stringify(env[key]);
  });

  return obj;
})(process.env);

export default {
  ...common,
  name: 'client',
  context: path.join(process.cwd(), 'src'),
  entry: ['./client.js'],
  output: {
    ...common.output,
    path: path.join(process.cwd(), 'public'),
    filename: 'bundle.js',
  },
  module: {
    ...common.module,
    loaders: [
      ...common.module.loaders,
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?minimize&sourceMap&modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader'
        ),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'file',
        query: { name: '[name].[ext]' },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
  ],
  envMap,
};
