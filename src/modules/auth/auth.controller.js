const cloudinarySvc = require("../../services/CloudinaryService");
const { randomStringGenerator } = require("../../utilities/helpers");
const bcrypt = require("bcryptjs");
const userModel = require("../user/user.model");

class authController {
  async register(req, res, next) {
    try {

      let data = req.body;

      if (!req.file) {
        next({
          code: 400,
          detail: { image: "Image is required" },
          message: "Image not provided",
          status: "ERR_VALIDATION_FAILED",
        });
      }

      data.image = await cloudinarySvc.fileUpload(req.file.path, '/users')
         //const salt = bcrypt.genSaltSync(12), instead,use the down one;
      data.password = bcrypt.hashSync(data.password, 12)

      //activation process
      data.status = 'inactive'  //activated not
      data.activationToken = randomStringGenerator()  //random string
      data.expiryTime = new Date(Date.now() + 8640000)

      // store data (database)
      let user = new userModel(data);
      await user.save()


      //notify


      res.json({
        data: data,
        message: "Your account has been registered successfully",
        status: "SUCCESS",
      });
    } catch(exception) {
      next(exception)
    }
  }


  login = (req, res, next) => {
    res.json({
      data: "Login Request",
      message: "Log-In successful",
      status: "SUCCESS",
    });
  };

  activate = (req, res, next) => {
    res.json({
      data: {
        params: req.params,
      },
      message: "User account has been activated successfully",
      status: "OK",
    });
  };

  update = (req, res, next) => {
    res.json({
      data: {
        params: req.params,
      },
      message: "Update User",
      status: "SUCCESS",
    });
  };

  Logout = (req, res, next) => {
    res.json({
      data: null,
      message: "User has logged out successfully",
      status: "OK",
    });
  };
}

const authCtrl = new authController();
module.exports = authCtrl;