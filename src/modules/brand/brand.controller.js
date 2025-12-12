const { UserRoles } = require("../../config/constants");
const brandSvc = require("./brand.service");

class BrandController {
  createBrand = async (req, res, next) => {
    try {
      const data = await brandSvc.transformToBrandData(req);
      const brand = await brandSvc.storeBrand(data);

      res.json({
        data: brand, 
        message: "Brand created successfully",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  readAllBrands = async (req, res, next) => {
    try {
      let filter = {}
      const loggedInUser = req.loggedInUser;
      // 
      if(loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          createdBy: loggedInUser._id
        }
      }

      // search 
      if(req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { slug: new RegExp(req.query.search, "i") },
            { status: new RegExp(req.query.search, "i") },
          ],
        };
      }

      const pageConfig = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 20
      }
      const {data, pagination} = await brandSvc.getAllRowsByFilter(filter, pageConfig);
      res.json({
        data: data, 
        message: "Brand Listing",
        status: "OK",
        meta: {pagination}
      })
    } catch(exception) {
      next(exception)
    }
  };

  getBrandById = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser; 
      let filter = {
        _id: req.params.id
      };
      if(loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter, 
          createdBy: loggedInUser._id
        }
      }
      const data = await brandSvc.getSingleRowByFilter(filter)
      res.json({
        data: data, 
        message: "Brand Detail fetched",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  updateBrandById = async(req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {_id: req.params.id,};
      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const brandDetail = await brandSvc.getSingleRowByFilter(filter);
      if(!brandDetail) {
        throw {code: 422, message: "Brand does not exists", status: "ERR_BRAND_NOT_FOUND"}
      }

      const data = await brandSvc.transformToBrandUpdateData(req, brandDetail);
      const update = await brandSvc.updateBrandByFilter(filter, data)
      res.json({
        data: update, 
        message: "Brand Updated Successfully", 
        status: "OK"
      })
    } catch (exception) {
      next(exception);
    }
  };

  deleteBrandById = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {_id: req.params.id,};
      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const brandDetail = await brandSvc.getSingleRowByFilter(filter);
      if(!brandDetail) {
        throw {code: 422, message: "Brand does not exists", status: "ERR_BRAND_NOT_FOUND"}
      }

      const deletedData = await brandSvc.deleteSingleRowById(filter);
      res.json({
        data: null, 
        message: "Brand Deleted",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  async getDetailBySlug(req, res, next) {
    try{

    }
    catch(exception) {
      next(exception)
    }
  }
}
const brandCtrl = new BrandController();

module.exports = brandCtrl