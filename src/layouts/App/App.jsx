import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import { Crash, NotFound } from '../../pages/Errors';
import root from '../../utils/root';

const App = ({
  t,
  children,
  crash,
  notFound,
}) => (
  <main>
    <Helmet
      htmlAttributes={{ lang: root.i18next.language }}
      title={t('title')}
      // titleTemplate=""
      defaultTitle="React Redux Universal Boilerplate"
      meta={[
          { charSet: 'utf-8' },
          { name: 'description', content: t('description') },
          { name: 'keywords', content: t('keywords') },
      ]}
      link={[
          { href: '/public/style.css', rel: 'stylesheet', id: 'styles' },
      ]}
    />
    <Choose>
      <When condition={crash}>
        <Crash />
      </When>
      <When condition={notFound}>
        <NotFound />
      </When>
      <Otherwise>
        {children}
      </Otherwise>
    </Choose>
  </main>
);

App.propTypes = {
  t: PropTypes.func,
  children: PropTypes.node,
  crash: PropTypes.bool,
  notFound: PropTypes.bool,
};

export default (translate('general')(App));
