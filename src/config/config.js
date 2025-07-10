require("dotenv").config() 

const CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey:  process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
};

module.exports = {
    CloudinaryConfig
}   