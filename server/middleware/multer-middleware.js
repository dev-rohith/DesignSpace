import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


// File filters
const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const mediaFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "video/mp4",
    "audio/mpeg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error("File type not allowed!"), false);
  }
  cb(null, true);
};

// Upload middleware configurations
const uploadSingleImage = multer({
  storage: singleImageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).single('image');

const uploadMultipleFiles = multer({
  storage: multipleFilesStorage,  //where multer-storage cloudinary not working so have to handle it normally with disk storage
  fileFilter: mediaFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  }
}).array('files', 5);





export default upload;
