const router = require("express").Router();             // router middleware
const authRouter = require("../modules/auth/auth.router");
const publicRouter = require("../modules/public/public.router");
const bannerRouter = require("../modules/banner/banner.router");
const brandRouter = require("../modules/brand/brand.router");
const categoryRouter = require("../modules/category/category.router");
const userRouter = require("../modules/user/user.router");
const productRouter = require("../modules/product/product.router");
const orderRouter = require("../modules/order/order.router");
const paymentRouter = require("../modules/payment/payment.router");
const chatRouter = require("../modules/chat/chat.router");

router.use("/public", publicRouter);
router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/chat", chatRouter);

module.exports = router;
