const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");
const checkLogin = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const {registerDTO, loginDTO} = require("./auth.contract");
const uploader = require("../../middlewares/uploader.middleware");
const { UserRoles } = require("../../config/constants");    

// uploader().none() => if no file upload, but is of type multipart/form-data
// uploader().single(fieldname) => if a single file is being uploaded from 'fieldname' field,
// uploader().array(fieldname) => if multiple files are being uploaded from 'fieldname' field,
// uploader().fields(fieldsetup) => if a single request has multiple file upload operation
authRouter.post("/register", uploader().single('image'),  bodyValidator(registerDTO), authCtrl.register);
authRouter.get("/activate/:token", authCtrl.activateRegisteredUser);
authRouter.get("/resend-link/:token", authCtrl.resendActivationEmail);
authRouter.post("/login", bodyValidator(loginDTO), authCtrl.login);
authRouter.get("/me", checkLogin(), authCtrl.getLoggedInUserProfile);
// //middlware method:
authRouter.put("/user/:id", checkLogin(), authCtrl.updateUserById);
authRouter.post("/logout", checkLogin(), authCtrl.logout);   // () => {return (req, res, next) => {}}

module.exports = authRouter;
