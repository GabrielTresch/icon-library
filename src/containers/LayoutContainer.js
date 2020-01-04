/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import axiox from 'axios';
import IconContainer from './IconContainer';

const LayoutContainer = () => {
  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, axiox });

  const [path, setPath] = useState([]);

  useEffect(() => {
    dbx.filesListFolder({ path: '' }).then((data) => { setPath(data.entries); });
  }, []);

  return (
    <main>
      <h1>Icon Library</h1>
      <IconContainer path={path} />
    </main>
  );
};

export default LayoutContainer;
