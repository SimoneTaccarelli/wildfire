import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import {Cloudinarystorage} from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productStorage = new Cloudinarystorage({
    cloudinary,
    params: {
        folder: 'wildfire/products',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
    });

const productUpload = multer({ storage: productStorage });

export { cloudinary, productUpload };

