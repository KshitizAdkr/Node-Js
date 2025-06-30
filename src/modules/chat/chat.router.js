const chatRouter = require("express").Router();
const chatCtrl = require("./chat.controller")

chatRouter.post('/', chatCtrl.Automation)
chatRouter.post('/Customer-Support', chatCtrl.CustomerSupport)

module.exports = chatRouter;