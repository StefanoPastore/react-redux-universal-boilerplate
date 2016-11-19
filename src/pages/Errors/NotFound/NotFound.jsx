import React, { PropTypes } from 'react';
import { translate } from 'react-i18next';
import { Page } from '../../../layouts';

const NotFound = ({
  t,
}) => (
  <Page>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </Page>
);

NotFound.propTypes = {
  t: PropTypes.func,
};

export default (translate('notFound')(NotFound));
