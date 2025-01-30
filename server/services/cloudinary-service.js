import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const CloudinaryService = {
  async uploadFile(file) {
    try {
      // Check if the file path is valid and exists
      if (!file || !file.path) {
        throw new Error("Invalid file path");
      }

      if (!fs.existsSync(file.path)) {
        throw new Error("File does not exist at path: " + file.path);
      }

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });

      return result;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error(error.message);
    }
  },

  async deleteFile(publicId, type) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: type || "raw",
      });
      return result;
    } catch (error) {
      console.error("Cloudinary delete failed:", error);
      throw new Error(error.message);
    }
  },
};

export default CloudinaryService;

/*

app.post('/upload-multiple', upload.array('files', 10), async (req, res) => {
    try {
      const fileUploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          resource_type: 'auto', // Automatically determine file type
        });
      });
  
      // Wait for all files to upload
      const uploadResults = await Promise.all(fileUploadPromises);
  
      // Delete the temporary files after uploading to Cloudinary
      req.files.forEach((file) => fs.unlinkSync(file.path));
  
      res.status(200).json({
        message: 'Files uploaded successfully',
        uploadedFiles: uploadResults,
      });
    } catch (err) {
      console.error('Error uploading files:', err);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  });


  {
    "message": "Files uploaded successfully",
    "uploadedFiles": [
      {
        "asset_id": "abc123",
        "public_id": "pdf-uploads/sample_file",
        "version": 1674853200,
        "resource_type": "raw",
        "secure_url": "https://res.cloudinary.com/your-cloud-name/raw/upload/v1674853200/sample_file.pdf"
      },
      {
        "asset_id": "def456",
        "public_id": "pdf-uploads/sample_image",
        "version": 1674853300,
        "resource_type": "image",
        "secure_url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1674853300/sample_image.jpg"
      }
    ]
  }
  

  */
