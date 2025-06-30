const bannerRouter = require("express").Router()
const bannerCtrl = require("./banner.controller")

//  func = (req, res, next) => {}
// bannerRouter.get("", )


bannerRouter.post('/', bannerCtrl.createBanner)
bannerRouter.get('/', bannerCtrl.readAllBanner)
bannerRouter.get('/:id', bannerCtrl.getBannerById)
bannerRouter.put('/:id', bannerCtrl.updateBanner)
bannerRouter.delete('/:id', bannerCtrl.deleteBanner)

module.exports = bannerRouter