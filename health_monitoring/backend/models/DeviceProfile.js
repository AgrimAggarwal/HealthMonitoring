const mongoose = require("mongoose");

const DeviceProfileSchema = mongoose.Schema({});

module.exports = mongoose.model(
  "Device_Profile",
  DeviceProfileSchema,
  "DeviceProfile"
);
