const productService = require("./product.service")
const {UserRoles} = require("../")

class productController {

    async createProduct(req, res, next) {
        try{
            const data = await productService.transformToProduct(req)
            const product = await productService.createProduct(req)



        }
        catch(exception){
            throw exception
        }
    }
    async getAllProducts(req, res, next) {
        try{
            let filter = {}

            if(req.loggedInUser.role !== UserRoles.ADMIN) {
                filter = {
                    createdBy: req.loggedInUser._id
                }
            }

            //search
            if(req.query.search) {
                filter = {
                    ...filter
                }
            }
        }
    }
 };


const productCtrl = new productController()
module.exports = productCtrl