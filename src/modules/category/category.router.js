const categoryRouter =  require("express").Router()
const { UserRoles } = require("../../config/constants");
const checkLogin = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const bodyValidator = require("../../middlewares/validator.middleware");
const { CategoryCreateRule } = require("./category.contract");
const categoryCtrl = require("./category.controller")

categoryRouter.get("/:slug/detail", categoryCtrl.getDetailBySlug);

categoryRouter.post("/", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bodyValidator(CategoryCreateRule), categoryCtrl.createCategory);
categoryRouter.get("/", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.readAllCategorys);
categoryRouter.get("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.getCategoryById);
categoryRouter.put("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), uploader().single('image'), bodyValidator(CategoryCreateRule), categoryCtrl.updateCategoryById);
categoryRouter.delete("/:id", checkLogin([UserRoles.ADMIN, UserRoles.SELLER]), categoryCtrl.deleteCategoryById);


module.exports = categoryRouter