import multer from "multer";
import fs from 'fs'
import path from "path";

const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destinationDir = path.join(process.cwd(), 'uploads', 'temporary');
     if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    cb(null, destinationDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);  // Extracts the extension like .jpg, .png, etc.
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Custom file filter based on allowed MIME types
const customFileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("File type not allowed!"), false);
    }
    cb(null, true);
  };
};

//uploading profile picture
export const uploadAvatar = (allowedTypes) => {
  return multer({
    storage: multerStorage,
    fileFilter: customFileFilter(allowedTypes), 
    limits: 1024 * 1024 * 5,
    files: 1,
  }).single("image");
};

// Example of creating an upload handler for images with a custom filter
export const uploadSingleFile = (allowedTypes, fileName, maxFileSize) => {
  return multer({
    storage: multerStorage,
    fileFilter: customFileFilter(allowedTypes), // Apply custom filter here
    limits: {
      fileSize: maxFileSize
    }, // Example file size limit of 5MB
  }).single(fileName);
};

// Upload multiple files with custom filter
export const uploadMultipleFiles = (allowedTypes, maxFileSize, maxFiles ) => {
   //defaults
   const fileSizeLimits = {
    "image/png": 5 * 1024 * 1024, // 5MB for PNG
    "image/jpeg": 5 * 1024 * 1024, // 5MB for JPEG
    "image/jpg": 5 * 1024 * 1024, // 5MB for JPG
    "application/pdf": 10 * 1024 * 1024, // 10MB for PDFs
    "video/mp4": 50 * 1024 * 1024, // 50MB for MP4 videos
    "default": 2 * 1024 * 1024, // 2MB for others
  };

  return multer({
    storage: multerStorage, // using closure
    fileFilter: customFileFilter(allowedTypes),
    limits: {
      fileSize: maxFileSize, // 10MB limit
      files: maxFiles, // Maximum files
    }, 
  }).array("files", maxFiles);
};

