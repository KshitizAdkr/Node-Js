const {AppConfig} =require("../../config/config")
const { GlobalStatus, DeviceTypes } = require("../../config/constants");
const cloudinarySvc = require("../../services/CloudinaryService");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {randomStringGenerator} = require("../../utilities/helpers");
const SessionModel = require("./auth.model");

class AuthService {
  generateActivationToken() {
    return {
      status: GlobalStatus.INACTIVE,    /// activated not 
      activationToken: randomStringGenerator(),   // random string 
      expiryTime:new Date(Date.now()+86400000)

    }
  }

  async transformForRegistration(req) {
    try {
      let data = req.body;

      if (!req.file) {
        throw {
          code: 400,
          detail: { image: "Image is required" },
          message: "Image not provided",
          status: "ERR_VALIDATION_FAILED",
        };
      }
      data.image = await cloudinarySvc.fileUpload(req.file.path, '/users')
      data.password = bcrypt.hashSync(data.password, 12)
      
      // activation process
      data = {
        ...data,
        ...this.generateActivationToken()
      }
      return data;
    } catch(exception) {
      throw exception;
    }
  }

  async storeSession(userDetail, loginDevice=DeviceTypes.WEB) {
    try {
      const sessionDetail = {
        user: userDetail._id, 
        tokens: {
          accessToken: jwt.sign({sub: userDetail._id, typ: "Bearer"}, AppConfig.jwtSecret, {expiresIn: "2h"}),
          refreshToken: jwt.sign({sub: userDetail._id, typ: "Refresh"}, AppConfig.jwtSecret, {expiresIn: "1d"})
        },
        deivce: loginDevice
      }
      const session = new SessionModel(sessionDetail)
      return await session.save()
    } catch(exception) {
      throw exception
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      return await SessionModel.findOne(filter)
        .populate('user', ['_id','name','email', 'role','status','address','image','dob','gender'])
    } catch(exception) {
      throw exception
    }
  }
}
const authSvc = new AuthService()
module.exports = authSvc