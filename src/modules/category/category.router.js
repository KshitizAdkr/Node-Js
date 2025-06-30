const categoryRouter =  require("express").Router()
const categoryCtrl = require("./category.controller")

categoryRouter.post('/', categoryCtrl.CategoryName)

categoryRouter.get('/Details', categoryCtrl.Details)


module.exports = categoryRouter
