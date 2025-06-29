class PaymentController {

 Stripe= (req, res, next) => {
    res.json({
        data: "Stripe ID request",
        message: "Stripe ID submitted",
        status: "SUCCESS"
    })
    res.json({
        data: "Password Request",
        message: "Password : ",
        status: "SUCCESS"
    })
    res.json({
        data: "OTP Request",
        message: "OTP : ",
        status: "SUCCESS"
    })
 };
  Khalti = (req, res, next) => {
    res.json({
        data: "Khalti ID Request",
        message: "Khalti ID : ",
        status: "SUCCESS"
    })
    res.json({
        data: "Password Request",
        message: "Password : ",
        status: "SUCCESS"
    })
    res.json({
        data: "OTP Request",
        message: "OTP : ",
        status: "SUCCESS"
    })
 };
 Esewa = (req, res, next) => {
    res.json({
        data: "Esewa Request",
        message: "Esewa ID : ",
        status: "SUCCESS"
    })
    res.json({
        data: "Password Request",
        message: "Password : ",
        status: "SUCCESS"
    })
    res.json({
        data: "OTP Request",
        message: "OTP : ",
        status: "SUCCESS"
    })
 };

}

const PaymentCtrl = new PaymentController()

module.exports = PaymentCtrl;