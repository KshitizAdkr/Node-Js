const cloudinarySvc = require("../../services/CloudinaryService");
const slugify = require('slugify');
const BrandModel = require("./brand.model");

class BrandService {
  async transformToBrandData(req) {
    try {
      const data = req.body;
      data.logo = null;
      if (req.file) {
        data.logo = await cloudinarySvc.fileUpload(req.file.path, "/brands");
      }

      data.slug = slugify(data.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });
      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      //consle.log(exception)
      throw exception;
    }
  }

  async transformToBrandUpdateData(req, oldBrand) {
    try {
      const data = req.body;
      data.logo = oldBrand.logo;

      if (req.file) {
        data.logo = await cloudinarySvc.fileUpload(req.file.path, "/brands");
      }
      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      //consle.log(exception)
      throw exception;
    }
  }

  async storeBrand(data) {
    try {
      const brand = new BrandModel(data);
      return await brand.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 20 }) {
    try {
      // const page = +config.page || 1;
      // const limit = +config.limit || 20;
      const skip = (page - 1) * limit;
      const data = await BrandModel.find(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "status",
          "address",
          "image",
          "dob",
          "gender",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "status",
          "address",
          "image",
          "dob",
          "gender",
        ])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);
      const totalRecords = await BrandModel.countDocuments(filter);

      return {
        data: data,
        pagination: {
          limit: limit,
          page: 1,
          total: totalRecords,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "status",
          "address",
          "image",
          "dob",
          "gender",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "status",
          "address",
          "image",
          "dob",
          "gender",
        ]);

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateBrandByFilter(filter, data){
    try {
      return await BrandModel.findOneAndUpdate(filter, {$set: data}, {new:true})
    } catch(exception) {
      throw exception;
    }
  }

  async deleteSingleRowById(filter) {
    try {
      return await BrandModel.findOneAndDelete(filter)
      
    } catch (exception) {
      throw exception;
    }
  }
}

const brandSvc = new BrandService()
module.exports = brandSvc;