const orderRouter = require("express").Router();
const orderCtrl = require("./order.controller")

orderRouter.post('/', orderCtrl.ProductID)
orderRouter.post('/', orderCtrl.Price)
orderRouter.post('/', orderCtrl.Quantity)
orderRouter.post('/UserID', orderCtrl.UserID)

module.exports = orderRouter;