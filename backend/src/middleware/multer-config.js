const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
}

//indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file)
    callback(null, 'public')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + '.' + extension)
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .gif, .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = upload.single('image');