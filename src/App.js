import './utils/serverMonkeyPatching'; // MUST BE ON TOP
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackClientConfig from '../webpack/client/config.dev.babel.js';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Resolver } from 'react-resolver';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { StyleSheetServer } from 'aphrodite';
import configureStore from './utils/configureStore';

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

      const store = configureStore();

      match({
        routes: this.hotDeps.getRoutes(store),
        location: req.originalUrl,
      }, (
        error,
        redirectLocation,
        renderProps
      ) => {
        global.logger.log('verbose', `Parsed request: ${req.originalUrl}`);
        if (redirectLocation) {
          global.logger.log('verbose', `Redirect from ${req.originalUrl} to ${redirectLocation.pathname + redirectLocation.search}`);
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          global.logger.log('alert', `ROUTER ERROR FOR ${req.originalUrl}`, error);
          res.status(500);
        } else if (renderProps) {
          global.logger.log('verbose', `Request success ${req.originalUrl}`);
          res.status(200);

          const {
            html: promise,
            css,
          } = StyleSheetServer.renderStatic(
            () => Resolver
              .resolve(
                () => <Provider store={store}>
                  <I18nextProvider i18n={i18next}>
                    <RouterContext {...renderProps} />
                  </I18nextProvider>
                </Provider>
              )
          );

          promise
            .then(({ Resolved, data }) => {
              const content = renderToString(<Resolved />);
              const page = renderToStaticMarkup(<this.hotDeps.HTML content={content} store={store} data={data} css={css} />);

              global.logger.log('info', `Send response for ${req.originalUrl}`);
              res.send(`<!doctype html>\n${page}`);
            })
            .catch((err) => {
              global.logger.log('error', `ASYNC ACTIONS FOR ${req.originalUrl}`, err);
              res.status(500).send('Server error!');
            });
        } else {
          global.logger.log('debug', `Request not found ${req.originalUrl}`);
          res.status(404).send('Not found');
        }
      });
    });

    this.server = app.listen(
      process.env.PORT,
      () => global.logger.log('info', `Listen on port ${process.env.PORT}`)
    );
  }
}

export default App;
