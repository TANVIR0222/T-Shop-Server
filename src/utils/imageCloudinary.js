import { v2 as cloudinary } from 'cloudinary';

const imageUploadeCloudinary = async(image) =>{

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    return await cloudinary.uploader.upload(image)

}

export default imageUploadeCloudinary;