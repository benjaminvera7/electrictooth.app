const formidable = require('formidable');
const fs = require('fs');

//sudo mongod --dbpath ~/data/db
const upload = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

const formParse = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

async function editAlbum(req, res) {
  const { fields, files } = await formParse(req);

  for (const property in files) {
    const songName = property;
    console.log(songName);
  }

  res.end();
}

async function editTrack() {}

module.exports = {
  editAlbum,
  editTrack,
};
