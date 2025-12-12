const brandRouter =  require("express").Router()
const { UserRoles } = require("../../config/constants");
const checkLogin = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const { BrandCreateRule } = require("./brand.contract");
const brandCtrl = require("./brand.controller")

brandRouter.post("/", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('logo'), bodyValidator(BrandCreateRule), brandCtrl.createBrand);
brandRouter.get("/", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.readAllBrands);
brandRouter.get("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.getBrandById);
brandRouter.put("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('logo'), bodyValidator(BrandCreateRule), brandCtrl.updateBrandById);
brandRouter.delete("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), brandCtrl.deleteBrandById);


module.exports = brandRouter