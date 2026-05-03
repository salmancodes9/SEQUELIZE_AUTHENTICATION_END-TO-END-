const multer = require("multer");

const storage = multer.memoryStorage(); //stores file in ram  till it gets uploaded

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image types are supported"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
  
});



module.exports = upload;
