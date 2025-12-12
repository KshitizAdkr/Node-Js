const { GlobalStatus } = require("../../config/constants");
const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");
const authSvc = require("./auth.service");
const bcrypt = require('bcryptjs')


class AuthController {
  async register(req, res, next) {
    try {
      // user raw data =====> DB user model mapping
      const data = await authSvc.transformForRegistration(req);
      // store data (database)
      let user = await userSvc.storeUser(data);
      // notify
      await authMailSvc.sendActivationEmail(user);
      res.json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image,
        },
        message: "Your account has been registered successfully",
        status: "SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async activateRegisteredUser(req, res, next) {
    try {
      const token = req.params.token;
      // token verify
      let userDetail = await userSvc.getSingleUserByFilter({
        activationToken: token,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "Token not found or associated user not found...",
          status: "TOKEN_NOT_FOUND_ERR",
        };
      }

      // user
      const currentTime = Date.now();
      const expiryTime = userDetail.expiryTime.getTime();
      if (expiryTime < currentTime) {
        throw {
          code: 422,
          message: "TOken expired",
          status: "TOKEN_EXPIRED_ERR",
        };
      }

      const activateData = {
        status: GlobalStatus.ACTIVE,
        activationToken: null,
        expiryTime: null,
      };

      userDetail = await userSvc.updateSingleUserByFilter({ _id: userDetail._id },activateData);

      // notify
      await authMailSvc.sendWelcomeEmailToUser(userDetail);

      // TODO: auto Login
      const session = await authSvc.storeSession(userDetail);
      res.json({
        data: {
          _id: session._id,
          tokens: session.tokens,
        },
        message: "Your account has been activated successfully",
        status: "SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async resendActivationEmail(req, res, next) {
    try {
      const token = req.params.token;
      // token verify
      const userDetail = await userSvc.getSingleUserByFilter({
        activationToken: token,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "Token not found or associated user not found...",
          status: "TOKEN_NOT_FOUND_ERR",
        };
      }

      const currentTime = Date.now();
      const expiryTime = userDetail.expiryTime.getTime();

      //
      if (expiryTime >= currentTime) {
        throw {
          code: 422,
          message: "Your token is not expired...",
          status: "TOKEN_NOT_EXPIRED_ERR",
        };
      }

      const updateToken = {
        ...authSvc.generateActivationToken(),
      };

      const user = await userSvc.updateSingleUserByFilter(
        { _id: userDetail._id },
        updateToken
      );
      await authMailSvc.reSendActivationEmail(user);

      res.json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image,
        },
        message: "A new activation link has been sent to your email",
        status: "SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password, loginType} = req.body;
      const userDetail = await userSvc.getSingleUserByFilter({
        email: email
      })
      if(!userDetail) {
        throw {code: 422, message: "User not found/registered", status: "USER_NOT_FOUND"}
      }

      // 
      console.log(userDetail)
      if(userDetail.status !== GlobalStatus.ACTIVE || userDetail.activationToken !== null) {
        throw {code: 422, message: "Your account has not been activated or is suspended", status: "ACCOUNT_NOT_ACTIVATED"}
      }

      // password verify
      if(!bcrypt.compareSync(password, userDetail.password)) {
        throw {code: 422, message: "Credentials does not match", status: "CREDENTIALS_DOES_NOT_MATCH"}
      }

      // TODO: Generate OTP -> db update with user -> email user -> respond to user.
      const session = await authSvc.storeSession(userDetail, loginType)
      res.json({
        data: {
          _id: session._id, 
          tokens: session.tokens
        }, 
        message: "Login Successful",
        status: "LOGIN_SUCCESS"
      })

    } catch(exception) {
      next(exception)
    }
  }

  async getLoggedInUserProfile(req, res, next) {
    res.json({
      data: req.loggedInUser,
      message: "Your profile",
      status: "ME",
    });
  }

  updateUserById = (req, res, next) => {
    res.json({
      data: {
        params: req.params,
      },
      message: "Update User",
      status: "OK",
    });
  };

  logout = (req, res, next) => {
    res.json({
      data: null,
      message: "Logout success",
      status: "OK",
    });
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;