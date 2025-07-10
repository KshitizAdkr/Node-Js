const cloudinary = require("cloudinary").v2
const { CloudinaryConfig } = require("../config/config")
const fs = require("fs") 


class CloudinaryService{
    constructor() {
        cloudinary.config({
            cloud_name: CloudinaryConfig.cloudName,
            api_key: CloudinaryConfig.apiKey,
            api_secret: CloudinaryConfig.apiSecret
        })
    }

    getImageUrl(publicId, size='1200x1200') {
        let [width, height] = size.split('x')
        return cloudinary.url(publicId, {
        transformation: [
         { width: width, height: height, aspect_ratio: "1.0", crop: "fill" },
         { quality: "auto" },
      ],
    });
  }


    async fileUpload(path, dir='/'){
        try{
            const {public_id, secure_url} = await cloudinary.uploader.upload(path, {
                folder: '/api-49'+dir,
                unique_filename: true
            })
        if(fs.exitsSync(path)) {
            fs.unlinkSync(path)
        }

        
      const url = this.getImageUrl(public_id)
      return {
        publicId: public_id,
        url: secure_url,
        thumb: url 
      }
        }
        catch(exception) {
            throw {
                code: 422,
                message: "File upload error on cloudinary",
                status: "ERR_FILE_UPLOAD_ON_CLOUDINARY"
            }
        }
    }
}

const cloudinarySvc = new CloudinaryService()
module.exports = cloudinarySvc