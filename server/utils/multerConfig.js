// multerConfig.js
import multer from 'multer';
import path from 'path';

// Multer configuration for storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define storage location based on file type
    if (file.mimetype.startsWith('image')) {
      cb(null, 'uploads/images/');
    } else if (file.mimetype.startsWith('video')) {
      cb(null, 'uploads/videos/');
    } else if (file.mimetype.startsWith('image/gif')) {
      cb(null, 'uploads/gifs/');
    } else {
      cb(new Error('Unsupported file type'), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mkv|avi|mov/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Multer configuration with limits (e.g., 100MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
  fileFilter: fileFilter
});

export default upload;
