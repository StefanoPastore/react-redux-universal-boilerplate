import React, { PropTypes } from 'react';

const Page = ({
  children,
}) => (
  <div>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
