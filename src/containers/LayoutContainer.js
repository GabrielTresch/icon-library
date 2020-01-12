/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import IconContainer from './IconContainer/IconContainer';
import './LayoutContainer.scss';

const LayoutContainer = () => {
  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, fetch });

  const [path, setPath] = useState([]);

  useEffect(() => {
    dbx.filesListFolder({ path: '' }).then((data) => setPath(data.entries.sort((a, b) => a.name.localeCompare(b.name))));
  }, []);
  return (
    <main>
      <h1>Icon Library</h1>
      <IconContainer path={path} />
    </main>
  );
};

export default LayoutContainer;
