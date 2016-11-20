import React, { PropTypes } from 'react';

const HTML = ({
  content,
  store,
  css = {
    content: '',
    renderedClassNames: {},
  },
  head,
}) => (
  <html {...head.htmlAttributes.toComponent()}>
    <head>
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.script.toComponent()}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__CSS_REHYDRATE__ = ${JSON.stringify(css.renderedClassNames)};` }} />
      <script src="/public/bundle.js"></script>
    </body>
  </html>
);

HTML.propTypes = {
  content: PropTypes.string,
  store: PropTypes.object,
  css: PropTypes.object,
  head: PropTypes.object,
};

export default HTML;
