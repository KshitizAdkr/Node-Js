const productRouter = require("express").Router();
const productCtrl = require("./product.controller")

productRouter.post('/', productCtrl.Name)
productRouter.post('/', productCtrl.Description)
productRouter.post('/', productCtrl.Price)
productRouter.post('/', productCtrl.Image)

module.exports = productRouter;