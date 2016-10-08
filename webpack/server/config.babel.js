import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import common from '../common.babel';

const whitelist = [];

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    if (whitelist.indexOf(mod) === -1) {
      nodeModules[mod] = 'commonjs ' + mod;
    }
  });
nodeModules['webpack/hot/poll'] = 'commonjs webpack/hot/poll';
export default {
  ...common,
  name: 'server',
  context: path.join(process.cwd(), 'src'),
  entry: ['./server.js'],
  target: 'node',
  externals: nodeModules,
  output: {
    ...common.output,
    path: path.join(process.cwd(), 'build'),
    filename: 'server.bundle.js',
  },
  module: {
    ...common.module,
    loaders: [
      ...common.module.loaders,
      {
        test: /\.(scss|css)$/,
        loader: 'css-loader/locals?minimize&sourceMap&modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'file',
        query: {
          name: '[name].[ext]',
          emitFile: false,
        }
      },
    ],
  },
  plugins: [],
};
