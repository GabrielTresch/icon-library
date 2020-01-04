/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import axiox from 'axios';

const IconContainer = () => {
  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, axiox });

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    dbx.filesListFolder({ path: '' }).then((data) => { setFolders(data.entries); });
  }, []);

  console.log(folders);
  return (
    <>
      <h1>My dropbox icon library</h1>
      <div>
        {folders.map((value) => (
          <p key={value.name}>{value.path_display}</p>
        ))}
      </div>
    </>
  );
};

export default IconContainer;
