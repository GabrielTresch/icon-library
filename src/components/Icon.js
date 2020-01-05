import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { Dropbox } from 'dropbox';
import axiox from 'axios';
import useIntersect from '../utils/useIntersect';

const Icon = ({ path }) => {
  const [icon, setIcon] = useState();
  const [fetched, setFetched] = useState(false);
  const [ref, { entry }] = useIntersect({});
  const [state, setState] = useState(true);

  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, axiox });

  useEffect(() => {
    if (entry.isIntersecting && !fetched) {
      setFetched(true);
      dbx.filesDownload({ path }).then((data) => {
        const blob = data.fileBlob;
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.addEventListener('loadend', () => setIcon(JSON.parse(reader.result)));
      });
    }
  }, [dbx, entry.isIntersecting, fetched, path]);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div ref={ref} onMouseEnter={() => setState(!state)} onMouseLeave={() => setState(!state)}>
      <Lottie
        options={defaultOptions}
        height={100}
        width={100}
        isStopped={state}
      />
    </div>
  );
};

Icon.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Icon;
