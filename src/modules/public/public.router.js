const publicRouter =require("express").Router()
const publicCtrl = require("./public.controller")

publicRouter.get('/', publicCtrl.LandPage)


publicRouter.get("/AboutUs", publicCtrl.AboutUs )

module.exports = publicRouter;