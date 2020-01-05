import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconList from '../api/IconsList';
import Icon from '../components/Icon';

const IconContainer = ({ path }) => {
  const [iconList, setIconList] = useState([]);
  useEffect(() => {
    IconList(path).then((data) => (setIconList(data)));
  }, [path]);
  return (
    <>
      <h1>My dropbox icon library</h1>
      {iconList.map((value) => (
        value.icons.map((elements) => (
          elements && (
            <Icon key={elements.name} path={elements.path_display} />
          )
        ))
      ))}
    </>
  );
};

IconContainer.propTypes = {
  path: PropTypes.array.isRequired,
};

export default IconContainer;
