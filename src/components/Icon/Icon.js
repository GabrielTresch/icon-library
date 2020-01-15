import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Lottie from 'react-lottie';
import { Dropbox } from 'dropbox';
import useIntersect from '../../utils/useIntersect';
import './Icon.scss';

const Icon = ({ path, type, name }) => {
  const [icon, setIcon] = useState();
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});
  const [state, setState] = useState(true);

  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, fetch });

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      dbx.filesDownload({ path }).then((data) => {
        const blob = data.fileBlob;
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.addEventListener('loadend', () => (type !== 'icons' ? setIcon(JSON.parse(reader.result)) : setIcon(parse(reader.result))));
      });
    }
  }, [dbx, entry.isIntersecting, fetched, icon, path, type]);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      {type !== 'icons' ? (
        <div ref={ref} onMouseEnter={() => setState(!state)} onMouseLeave={() => setState(!state)} className={`${type} card`}>
          <Lottie
            options={defaultOptions}
            isStopped={state}
          />
          <span>{name}</span>
        </div>
      ) : (
        <div ref={ref} onMouseEnter={() => setState(!state)} onMouseLeave={() => setState(!state)} className={`${type} card`}>
          {icon}
          <span>{name}</span>
        </div>
      )}
    </>
  );
};

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Icon;
