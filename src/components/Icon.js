import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ path }) => (
  <>
    <h2>icon</h2>
    <p>{path}</p>
  </>
);

Icon.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Icon;
