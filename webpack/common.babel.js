import getAutoprefixer from 'autoprefixer';
import precss from 'precss';
import path from 'path';

// load global variables SASS
const sassGlobalData = `$env: ${process.env.NODE_ENV};
@import '${path.join(process.cwd(), 'src', 'styles', 'settings', 'variables')}';
@import '${path.join(process.cwd(), 'src', 'styles', 'settings', 'palette')}';`;

export default {
  output: {
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!(\/webpack\/hot\/poll))/,
        loader: 'babel',
        include: process.cwd(),
      },
    ],
  },
  postcss: [getAutoprefixer({ browsers: ['last 2 versions'] }), precss],
  sassLoader: {
    data: sassGlobalData,
  },
};
