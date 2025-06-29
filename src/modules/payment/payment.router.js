const paymentRouter = require("express").Router();
const paymentCtrl = require("./payment.controller")

paymentRouter.post('/Stripe', paymentCtrl.Stripe)
paymentRouter.post('/Khalti', paymentCtrl.Khalti)
paymentRouter.post('/Esewa', paymentCtrl.Esewa)

module.exports = paymentRouter;