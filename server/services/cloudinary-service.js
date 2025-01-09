import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    });

export const CloudinaryService = {
    async uploadImage(file) {
        try {
            const result = await cloudinary.uploader.upload(file.path);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async deleteImage(publicId) {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

