require("dotenv").config() 

const CloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey:  process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const MongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DBNAME
}

module.exports = {
    CloudinaryConfig,
    MongodbConfig,
}   