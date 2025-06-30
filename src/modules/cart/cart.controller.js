class cartController {

 NoOfQuantity = (req, res, next) => {
    res.json({
        data: "Number Of Quantity Request",
        message: "Number of quantities submitted",
        status: "SUCCESS"
    })
 };

 TotalPrice = (req, res, next) => {
    res.json({
        data: "Total Price data",
        message: "Total Price : ",
        status: "SUCCESS"
    })
 };

 ProductID = (req, res, next) => {
    res.json({
        data: "Product ID generation Request",
        message: "Product ID : ",
        status: "SUCCESS"
    })
 };

 Shipping = (req, res, next) => {
    res.json({
        data: "Shipping Method Request",
        message: "Shipping ID : ",
        status: "SUCCESS"
    })
 };


}

const cartCtrl = new cartController()

module.exports = cartCtrl