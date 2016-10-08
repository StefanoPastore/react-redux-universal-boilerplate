import React, { PropTypes } from 'react';

// defines
import { translate } from 'react-i18next';

// import layouts
import { Page } from '../../layouts';

const Home = ({ t, helloWorld }) => (
  <Page>
    <If condition={helloWorld}>
      <h1>Hello world!</h1>
    <Else />
      <h1>Loading...</h1>
    </If>
    <p>{t('title')}</p>
  </Page>
);

Home.propTypes = {
  t: PropTypes.func,
  helloWorld: PropTypes.bool,
};

export default (translate(['home'])(Home));
