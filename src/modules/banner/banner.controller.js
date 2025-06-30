class BannerController {

 createBanner = (req, res, next) => {
     res.json({
      data: { name: "Banner Data" },
      message: "Your account has been registered successfully",
      status: "SUCCESS",
    })
 };
 readAllBanner = (req, res, next) => {

 };
 getBannerById = (req, res, next) => {

 };
 updateBanner = (req, res, next) => {

 };
 deleteBanner = (req, res, next) => {

 };
}

const bannerCtrl = new BannerController()

module.exports = bannerCtrl