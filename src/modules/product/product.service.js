const { default: slugify } = require("slugify");
const cloudinarySvc = require("../../services/CloudinaryService");

class ProductService {
    async transformToProduct(req){
        try {
            const data = req.body;
            data.slug = slugify(data.name, {
                lower: true, strict: true, trim: true, replace: /[*+~.()'"!:@]/g
            })

            //rrupee to paisa
            data.price = data.price * 100
            data.afterDiscount = data.price - (data.price * data.discount/100)

            if(!data.category || data.category === 'null'){
                data.category = null
            }

            if(!data.brand || data.brand === 'null'){
                data.category = null
            }

            if(!data.seller || data.seller === 'null'){
                data.category = req.loggedInUser._id;
            }

            data.createdBy = req.loggedInUser._id;

            //images
            if(req.files){
                 let images= [];
                 req.files.map((image) => {
                    images.push(cloudinarySvc.singleFileUpload(image.path, '/products'))
                 })
                 const result = await Promise.allSettled(images);
                 data.images  = [];
                 result.forEach((res) => {
                    if(res.status === "fulfiled"){
                        data.images.push(res.value);
                    }
                 });
            }

            return data;

        }catch(exception) {
            throw exception
        }
    }

    async createProduct(data) {
        try{
            const prduct = new ProductModel(data)
            return await product.save()
        }
        catch(exception){
            throw exception
        }
    }

    async getAllRowsByFilter(filter, config) {
        try {
            const skip = (config.page - 1) * config.limit
            const data = await ProductModel.find
        }
    }
}

module.exports = new ProductService