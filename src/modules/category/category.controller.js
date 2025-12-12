const { UserRoles } = require("../../config/constants");
const categorySvc = require("./category.service");

class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      const data = await categorySvc.transformToCategoryData(req);
      const category = await categorySvc.storeCategory(data);

      res.json({
        data: category, 
        message: "Category created successfully",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  readAllCategorys = async (req, res, next) => {
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
        limit: +req.query.limit || 20,
      }
      const {data, pagination} = await categorySvc.getAllRowsByFilter(filter, pageConfig);
      res.json({
        data: data, 
        message: "Category Listing",
        status: "OK",
        meta: {pagination}
      })
    } catch(exception) {
      next(exception)
    }
  };

  getCategoryById = async (req, res, next) => {
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
      const data = await categorySvc.getSingleRowByFilter(filter)
      res.json({
        data: data, 
        message: "Category Detail fetched",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  updateCategoryById = async(req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {_id: req.params.id,};
      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const categoryDetail = await categorySvc.getSingleRowByFilter(filter);
      if(!categoryDetail) {
        throw {code: 422, message: "Category does not exists", status: "ERR_BRAND_NOT_FOUND"}
      }

      const data = await categorySvc.transformToCategoryUpdateData(req, categoryDetail);
      const update = await categorySvc.updateCategoryByFilter(filter, data)
      res.json({
        data: update, 
        message: "Category Updated Successfully", 
        status: "OK"
      })
    } catch (exception) {
      next(exception);
    }
  };

  deleteCategoryById = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      let filter = {_id: req.params.id,};
      if (loggedInUser.role !== UserRoles.ADMIN) {
        filter = {
          ...filter,
          createdBy: loggedInUser._id,
        };
      }
      const categoryDetail = await categorySvc.getSingleRowByFilter(filter);
      if(!categoryDetail) {
        throw {code: 422, message: "Category does not exists", status: "ERR_BRAND_NOT_FOUND"}
      }

      const deletedData = await categorySvc.deleteSingleRowById(filter);
      res.json({
        data: null, 
        message: "Category Deleted Succesfully",
        status: "OK"
      })
    } catch(exception) {
      next(exception)
    }
  };

  async getDetailBySlug(req, res, next) {
    try {
      const categoryDetail = await categoryService.getSingleRowByFilter({
        slug: req.params.slug,
      });

      // to list al lthe products associatec with this category
      // TODO: PRODUCT API
      res.json({
        data: {
          category: categoryDetail,
          products: [],
        },
        message: "Category Detail",
        status: "OK",
        meta: {},
      });
    } catch (exception) {
      next(exception);
    }
  }
}
const categoryCtrl = new CategoryController();

module.exports = categoryCtrl;