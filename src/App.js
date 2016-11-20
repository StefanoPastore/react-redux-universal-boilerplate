import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackClientConfig from '../webpack/client/config.dev.babel.js';
import { createMemoryHistory, match, RouterContext } from 'react-router';
class App {
  hotDeps: {}

  server: {}

  start() {
    global.logger.log('info', 'Init App');

    const app = express();

    const publicPath = path.join(process.cwd(), 'public');
    const compiler = webpack(webpackClientConfig);

    if (process.env.NODE_ENV === 'development') {
      global.logger.log('verbose', 'Aplly middlewares webpack for hot reloading');
      app.use(webpackDevMiddleware(compiler, {
        quiet: true,
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: webpackClientConfig.output.publicPath,
        headers: { 'Access-Control-Allow-Origin': '*' },
        stats: { colors: true },
        watchOptions: {
          aggregateTimeout: 300,
          poll: true,
        },
      }));

      app.use(webpackHotMiddleware(compiler, {
        log: console.log,
      }));
    }

    global.logger.log('verbose', 'Apply middlewares static files');
    app.use('/public', express.static(publicPath));

    app.use((req, res, next) => {
      if (req.url === '/robots.txt') {
        res.type('text/plain');

        res.send(`User-agent: *\nDisallow: ${process.env.NODE_ENV === 'production' ? '' : '/'}`);
      } else {
        next();
      }
    });

    global.logger.log('verbose', 'Aplly middleware for routing pages');
    app.use((req, res) => {
      global.logger.log('verbose', `Request received: ${req.originalUrl}`);

      const memoryHistory = createMemoryHistory(req.url);
      const store = this.hotDeps.configureStore(memoryHistory);
      const getRenderPage = this.hotDeps.renderPage(req, res);

      (async () => {
        const routes = this.hotDeps.getRoutes(store, memoryHistory);
        const renderPage = getRenderPage(store);

        match({
          routes,
          location: req.originalUrl,
        }, (
          error,
          redirectLocation,
          renderProps
        ) => {
          global.logger.log('verbose', `Parsed request: ${req.originalUrl}`);
          if (redirectLocation) {
            global.logger.log('verbose', `Redirect from ${req.originalUrl} to ${redirectLocation.pathname + redirectLocation.search}`);
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
          } else {
            if (error) {
              global.logger.log('alert', `ROUTER ERROR FOR ${req.originalUrl}`, error);
              res.status(500);
              store.dispatch(this.hotDeps.statusActions.setCrash());
              renderPage(this.hotDeps.AppContainer);
            } else if (renderProps) {
              const notFound = this.hotDeps.statusSelectors.notFound(store.getState());
              global.logger.log('verbose', `Request ${notFound ? 'not found route' : 'success'} ${req.originalUrl}`);
              res.status(!notFound ? 200 : 404);
              renderPage(RouterContext, renderProps);
            } else {
              res.status(404);
              store.dispatch(this.hotDeps.statusActions.setNotFound());
              renderPage(this.hotDeps.AppContainer);
            }
          }
        });
      })();
    });

    this.server = app.listen(
      process.env.PORT,
      () => global.logger.log('info', `Listen on port ${process.env.PORT}`)
    );
  }
}

export default App;
