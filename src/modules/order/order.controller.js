class orderController {

 UserID= (req, res, next) => {
    res.json({
        data: "User ID request",
        message: "User ID submitted",
        status: "SUCCESS"
    })
 };
  ProductID = (req, res, next) => {
    res.json({
        data: "Order ID generation Request",
        message: "Order ID : ",
        status: "SUCCESS"
    })
 };
 Quantity = (req, res, next) => {
    res.json({
        data: "Quantity Request",
        message: "quantities submitted",
        status: "SUCCESS"
    })
 };
 Price = (req, res, next) => {
    res.json({
        data: "Price data",
        message: "Price of the product",
        status: "SUCCESS"
    })
 };
 

}

const orderCtrl = new orderController()

module.exports = orderCtrl