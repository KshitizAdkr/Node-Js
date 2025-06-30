const userRouter = require("express").Router();
const userCtrl = require("./user.controller")

userRouter.post('/', userCtrl.UserName)
userRouter.post('/Email', userCtrl.Email)
userRouter.post('/', userCtrl.Password)
userRouter.post('/PhoneNo', userCtrl.PhoneNo)

module.exports = userRouter;