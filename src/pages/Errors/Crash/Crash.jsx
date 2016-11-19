import React, { PropTypes } from 'react';
import { translate } from 'react-i18next';

const Crash = ({
  t,
}) => (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </div>
);

Crash.propTypes = {
  t: PropTypes.func,
};

export default (translate('crash')(Crash));
