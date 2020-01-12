import { Dropbox } from 'dropbox';

const IconList = async (path) => {
  const accessToken = process.env.REACT_APP_TOKEN;
  const dbx = new Dropbox({ accessToken, fetch });
  console.log(path);
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
  iconList.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  console.log(iconList);
  return iconList;
};

export default IconList;
