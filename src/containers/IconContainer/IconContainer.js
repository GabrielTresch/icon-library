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
  return (
    <>
      <h1>My dropbox icon library</h1>
      <div>
        {iconList.map((value) => (
          <div key={value.name}>
            <h3>{value.name}</h3>
            <div className="icon-container">
              {value.icons.map((elements) => (
                elements && (
                <Icon key={elements.name} path={elements.path_display} type={value.name} />
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

IconContainer.propTypes = {
  path: PropTypes.array.isRequired,
};

export default IconContainer;
