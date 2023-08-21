import { v2 as cloudinary } from 'cloudinary';
export const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,  
            api_secret: process.env.API_SECRET,
            secure: true
        });
        console.log("connected to cloudinary")
    } catch (error) {
        console.log(error)
    }
}