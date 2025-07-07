const multer = require('multer');
const fs = require("fs");
const { exit } = require('process');

const uploader = (type='image') => {
    let allowedExts = ['jpg','jpeg','png','gif','svg','bmp','webp']

    if(type === 'doc'){
        allowedExts = ['pdf','json','doc','docx','csv','ppt','pptx','odt']
    } else if(type === 'audio'){
        allowedExts = ['mp3']
    }

    const myStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads/"
            if(!fs.existsSync(path)) {
                fs.mkdirSync(path), {recursive: true}
            }
            cb(null,path)
        },
        fileName: (req, file, cb) => {
            const fileName = Date.now()+"-"+file.originalName
            cb(null, fileName)
        }
    })

    const validateFile = (req, file, cb) => {

        const ext = file.originalname.split(".").pop()
        if(allowedExts.includes(ext.toLowerCase())) {
            cb(null, true);
        } else {
            cb({
                code: 422, message: "File Format Not Supported", status: "ERR_INVALID_FILE"
            })
        }
    }

    return multer({
           storage: myStorage,
            fileFilter: validateFile,
            limit: {
                fileSize: 5 * 1024 * 1024
            }
    })
}


module.exports = uploader

//cloudinary