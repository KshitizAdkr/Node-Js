const cartRouter = require("express").Router();
const cartCtrl = require("./cart.controller")

cartRouter.post('/', cartCtrl.NoOfQuantity)
cartRouter.post('/', cartCtrl.TotalPrice)
cartRouter.post('/', cartCtrl.ProductID)
cartRouter.post('/', cartCtrl.Shipping)

module.exports = cartRouter;