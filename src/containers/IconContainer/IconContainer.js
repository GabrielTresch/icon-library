import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconList from '../../api/IconsList';
import Icon from '../../components/Icon/Icon';
import './IconContainer.scss';

const IconContainer = ({ path }) => {
  const [iconList, setIconList] = useState([]);
  useEffect(() => {
    IconList(path).then((data) => (setIconList(data)));
  }, [path]);
  console.log('gab', iconList);
  return (
    <>
      <h1>My dropbox icon library</h1>
      <div className="icon-container">
        {iconList.map((value) => (
          <>
            <h3>{value.name}</h3>
            {value.icons.map((elements) => (
              elements && (
              <Icon key={elements.name} path={elements.path_display} type={value.name} />
              )
            ))}
          </>
        ))}
      </div>
    </>
  );
};

IconContainer.propTypes = {
  path: PropTypes.array.isRequired,
};

export default IconContainer;
