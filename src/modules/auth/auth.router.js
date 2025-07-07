const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");
const checkLogin = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const {registerDTO, loginDTO} = require("./auth.contract");
const uploader = require("../../middlewares/uploader.middleware");

//uploader().none() => if no file upload,but is of type multipart/filedata
//uploader().single(FileName) => if a single file is uploaded from "fieldNAme " field
authRouter.post("/register",uploader().single('image'), bodyValidator(registerDTO), authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.get("/activate", authCtrl.activate);

// //middlware method:
authRouter.put("/user/:id", checkLogin(), authCtrl.update);
authRouter.post("/logout", checkLogin(), authCtrl.Logout);

module.exports = authRouter;
