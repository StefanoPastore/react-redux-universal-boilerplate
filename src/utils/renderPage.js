import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { reduxUniversalRender } from 'redux-universal-render';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { StyleSheetServer } from 'aphrodite';
import Helmet from 'react-helmet';
import { HTML, AppContainer as App } from '../layouts';
import {
  actions as statusActions,
} from '../modules/Status';

const renderPage = (req, res) => (store) => (Component, props) => {
  const render = (<Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <Component {...props} />
    </I18nextProvider>
  </Provider>);
  reduxUniversalRender(
    store,
    render,
    () => {
      try {
        const {
          html,
          css,
        } = StyleSheetServer.renderStatic(() => renderToString(render));
        const head = Helmet.rewind();
        const page = renderToStaticMarkup(<HTML content={html} store={store} css={css} head={head} />);

        global.logger.log('verbose', `Send response for ${req.originalUrl}`);
        res.send(`<!doctype html>\n${page}`);
      } catch (err) {
        global.logger.log('error', `RENDER FOR ${req.originalUrl}`, err);
        res.status(500);
        store.dispatch(statusActions.setCrash());
        const {
          html,
          css,
        } = StyleSheetServer.renderStatic(() => renderToString(<Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <App />
          </I18nextProvider>
        </Provider>));
        const head = Helmet.rewind();
        const page = renderToStaticMarkup(<HTML content={html} css={css} store={store} head={head} />);
        res.send(`<!doctype html>\n${page}`);
      }
    },
    () => StyleSheetServer.renderStatic(() => renderToString(render))
  );
};

export default renderPage;
