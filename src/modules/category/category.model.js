const mongoose = require('mongoose');
const { GlobalStatus } = require('../../config/constants');


const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 200,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    image: {
      publicId: String,
      url: String,
      thumb: String,
    },
    status: {
      type: String,
      enum: Object.values(GlobalStatus),
      default: GlobalStatus.INACTIVE,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = CategoryModel