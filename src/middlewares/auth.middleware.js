const { AppConfig } = require("../config/config");
const authSvc = require("../modules/auth/auth.service");
const jwt = require("jsonwebtoken");
const userSvc = require("../modules/user/user.service");
const { UserRoles } = require("../config/constants");
// checkLogin
const checkLogin = (allowedRoles = null) => {
  return async (req, res, next) => {
    try{
      let token = req.headers["authorization"] || null;
      if(!token) {
        next({code: 401, message: "Token required", stauts: "UNAUTHENTICATED"})
      }
      token = token.replace("Bearer ", "")
      const session = await authSvc.getSingleRowByFilter({
        "tokens.accessToken": token
      })

      if(!session) {
        next({code: 401, message: "Session not found", status: "UNAUTHENTICATED"})
      }

      const data = jwt.verify(session.tokens.accessToken, AppConfig.jwtSecret)
      const userDetail = await userSvc.getSingleUserByFilter({_id: data.sub});

      if(!userDetail) {
        next({code: 401, message: "User does not exists any", status: "UNAUTHENTICATED"})
      }

      // 
      req.loggedInUser = {
        _id: userDetail._id,
        name: userDetail.name,
        email: userDetail.email,
        role: userDetail.role,
        status: userDetail.status,
        address: userDetail.address,
        image: userDetail.image,
        dob: userDetail.dob,
        gender: userDetail.gender
      }

      // authorization 
      if(
          allowedRoles === null || 
          userDetail.role === UserRoles.ADMIN || 
          (allowedRoles !== null && allowedRoles.includes(userDetail.role))
      ) {
        next()
      } else {
        next({
          code: 403, message: "You don't have permission to access", status: "ACCESS_DENIED"
        })
      }
    } catch(exception) {
      // 
      next({
        code: 401, message: exception.message, status: "UNAUTHENTICATED"
      })
    }
  };
};

module.exports = checkLogin