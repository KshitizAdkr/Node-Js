const { string, required } = require("joi")
const mongoose = require("mongoose")
const { UserRoles, GlobalStatus, Gender } = require("../../config/constants")

const AddressSchema = new mongoose.Schema({
    country: String,
    ZipCode: String,
    state: String,
    distric: String,
    municipality: String,
    ward: String,
    StreetTole: String,
    houseNo: String,
})

const UserSchema = new mongoose.Schema({
    // design of schema
     name: {
        type: String,
        required: true,
        min: 2,
        max: 50
     },
     email: {
        type: String,
        required: true,
        unique: true,
     }, 
     password: {
        type: String,
        required: true,
     }, 
     role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.CUSTOMER
     }, 
     status: {
        type: String,
        enum: Object.values(GlobalStatus),
        deafult: GlobalStatus.INACTIVE
     }, 
     activationToken: String, 
     resetToken: String, 
     expiryTime: Date, 
     dob: Date, 
     gender: {
        type: String,
        enum: Object.values(Gender),
        deafult: null,
     }, 
     image: {
        publicId: String,
        url: String,
        thumb: String,
     }, 
     address: {
        billing: String,
        shipping: String
     },
     createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        deafult: null,
     },
     updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        deafult: null,
     }, 
}, 
{
    //config
    timestamps: true, // createdAt, updateAt
    autoCreate: true,
    autoIndex: true
}
);

const userModel = mongoose.model("User", UserSchema)
module.exports = userModel