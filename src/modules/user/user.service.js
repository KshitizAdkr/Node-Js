const UserModel = require("./user.model");

class UserService {
  async storeUser(userData) {
    try {
      const user = new UserModel(userData)
      return await user.save()
    } catch(exception) {
      throw exception
    }
  }

  async updateSingleUserByFilter(filter, data) {
    try {
      return await UserModel.findOneAndUpdate(filter, {$set: data}, {new: true})
    } catch(exception) {
      throw exception
    }
  }

  async getSingleUserByFilter(filter) {
    try {
      return await UserModel.findOne(filter);
    } catch(exception) {
      throw exception
    }
  }
}
const userSvc = new UserService()
module.exports = userSvc;