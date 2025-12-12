const mongoose = require("mongoose");
const { DeviceTypes } = require("../../config/constants");

const SessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  tokens: {
    accessToken: String, 
    refreshToken: String,
  },
  device: {
    type: String, 
    enum: Object.values(DeviceTypes),
    default: DeviceTypes.WEB
  },
  data: String
}, {
  autoCreate: true,
  autoIndex: true, 
  timestamps: true
})

const SessionModel = mongoose.model("Session", SessionSchema)
module.exports = SessionModel