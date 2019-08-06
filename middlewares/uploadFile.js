const moduleName = 'utils/uploadFile';

const path = require('path');

const multer = require('multer');

const folderPath = path.join(__base, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const savePath = req.client.is_admin === true ? `${folderPath}/admin/` : `${folderPath}/public/`;
    cb(null, savePath);
  },
  filename: (req, file, cb) => {
    if(req.client.is_admin === true) {
      cb(null, file.originalname);
    } else {
      cb(null, new Date().toISOString() + file.originalname);
    }
  }
});

const fileFilter = (req, file, cb) => {
  const fileTypeArr = ['image/jpeg', 'image/jpg', 'image/png']
  if (fileTypeArr.includes(file.mimetype)) {
    cb(null, true);
  } else {
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