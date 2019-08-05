const moduleName = 'utils/uploadFile';

const path = require('path');

const multer = require('multer');

let folderPath = path.join(__base, 'uploads/');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    folderPath = req.client.is_admin === true ? `${folderPath}admin/` : folderPath;
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const fileTypeArr = ['image/jpeg', 'image/jpg', 'image/png']
  if (fileTypeArr.includes(file.mimetype)) {
    // req.client.is_file = true;
    console.log('yyy');
    cb(null, true);
  } else {
    // req.client.is_file = false;
    console.log('nnn');
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = upload;