import { Dropbox } from 'dropbox';
import axiox from 'axios';

const IconList = async (path) => {
  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, axiox });

  const iconList = [];

  await Promise.all(path.map((value, i) => (
    dbx.filesListFolder({ path: value.path_display }).then((data) => {
      iconList.push({
        id: i,
        name: value.name,
        icons: data.entries,
      });
    })
  )));
  return iconList;
};

export default IconList;
