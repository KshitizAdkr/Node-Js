const brandRouter =  require("express").Router()
const brandCtrl = require("./brand.controller")

brandRouter.post('/', brandCtrl.BrandName)

brandRouter.get('/', brandCtrl.About)


module.exports = brandRouter