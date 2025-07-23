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

const SmtpConfig ={
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FROM,
}

const AppConfig = {
  frontendUrl: process.env.FRONTEND_URL,
};

module.exports = {
    CloudinaryConfig,
    MongodbConfig,
    SmtpConfig,
    AppConfig,
}   