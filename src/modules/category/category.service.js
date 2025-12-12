const cloudinarySvc = require("../../services/CloudinaryService");
const slugify = require('slugify');
const CategoryModel = require("./category.model");

class CategoryService {
  async transformToCategoryData(req) {
    try {
       const data = req.body;
      data.slug = slugify(data.name, {
        lower: true,
        trim: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });
      // image upload
      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "/category");
      }
      // parentId handling ('' or null → null)
      if (!data.parentId || data.parentId === "null") {
        data.parentId = null;
      }
      // brandId handling
      if (!data.brandId || data.brandId === "null") {
        data.brandId = null;
      }
      // createdBy
      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      //consle.log(exception)
      throw exception;
    }
  }

  async transformToCategoryUpdateData(req, oldCategory) {
    try {
      const data = req.body;
      data.image = oldCategory.image;

      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "/categorys");
      }

      if (!data.parentId || data.parentId === "null") {
        data.parentId = null;
      }
      
      if (!data.brandId || data.brandId === "null") {
        data.brandId = null;
      }

      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      //consle.log(exception)
      throw exception;
    }
  }

  async storeCategory(data) {
    try {
      const category = new CategoryModel(data);
      return await category.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 20 }) {
    try {
      const page = +config.page || 1;
      const limit = +config.limit || 20;
      const skip = (page - 1) * limit;
      const data = await CategoryModel.find(filter)
        .populate("createdBy", ["_id","name","email","role","image","status"])
        .populate("updatedBy", ["_id","name","email","role","image","status"])
        .populate("parentId", ["_id",'name','slug','status','image','brandId'])
        .populate("brandId", ["_id",'name','slug','status','logo'])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      const totalRecords = await CategoryModel.countDocuments(filter);

      return {
        data: data,
        pagination: {
          limit: limit, page: page, total: totalRecords,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await CategoryModel.findOne(filter)
       .populate("createdBy", ["_id","name","email","role","image","status"])
        .populate("updatedBy", ["_id","name","email","role","image","status"])
        .populate("parentId", ["_id",'name','slug','status','image','brandId'])
        .populate("brandId", ["_id",'name','slug','status','logo']);

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateCategoryByFilter(filter, data){
    try {
      return await CategoryModel.findOneAndUpdate(filter, {$set: data}, {new:true})
    } catch(exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      return await CategoryModel.findOneAndDelete(filter)
    } catch (exception) {
      throw exception;
    }
  }
}

const categorySvc = new CategoryService()
module.exports = categorySvc;