import React, { PropTypes } from 'react';

const HTML = ({
  content,
  store,
  data,
  css,
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link href="/public/style.css" rel="stylesheet" id="styles" />
      <style data-aphrodite dangerouslySetInnerHTML={{ __html: css.content }}></style>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__CSS_REHYDRATE__ = ${JSON.stringify(css.renderedClassNames)};` }} />
      <script src="/public/bundle.js"></script>
    </body>
  </html>
);

HTML.propTypes = {
  content: PropTypes.string,
  store: PropTypes.object,
  data: PropTypes.object,
  css: PropTypes.object,
};

export default HTML;
