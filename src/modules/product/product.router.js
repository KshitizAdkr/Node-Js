const productRouter = require("express").Router();
const { UserRoles } = require("../../config/constants");
const checkLogin = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const { ProductCreateRule } = require("./product.contract");
const productCtrl = require("./product.controller")

productRouter.post("/", checkLogin([UserRoles.SELLER]), uploader().array("images"), bodyValidator(ProductCreateRule), productCtrl.createProduct);
productRouter.post('/', checkLogin([UserRoles.SELLER]), productCtrl.getaAllProducts);
productRouter.post('/:id', checkLogin([UserRoles.SELLER]), productCtrl.Description);
// productRouter.post('/', productCtrl.Price)
// productRouter.post('/', productCtrl.Image)

module.exports = productRouter;