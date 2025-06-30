class productController {

 Name= (req, res, next) => {
    res.json({
        data: "product data",
        message: "Enter Product Name",
        status: "SUCCESS"
    })
 };
 Description = (req, res, next) => {
    res.json({
        data: "Description Request",
        message: "Description of following product",
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
 Image = (req, res, next) => {
    res.json({
        data: "Image Request",
        message: "Image view",
        status: "SUCCESS"
    })
 };
}

const productCtrl = new productController()

module.exports = productCtrl