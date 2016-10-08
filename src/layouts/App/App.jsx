import React, { PropTypes } from 'react';

const App = ({
  children,
}) => (
  <main>
    {children}
  </main>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
