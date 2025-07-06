
const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");
const checkLogin = require("../../middlewares/auth.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const {registerDTO, loginDTO} = require("./auth.contract")

authRouter.post("/register", bodyValidator(registerDTO), authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.get("/activate", authCtrl.activate);

// //middlware method:
authRouter.put("/user/:id", checkLogin(), authCtrl.update);
authRouter.post("/logout", checkLogin(), authCtrl.Logout);

module.exports = authRouter;
