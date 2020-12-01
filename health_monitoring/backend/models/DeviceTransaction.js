const mongoose = require("mongoose");

const DevtransactionSchema = mongoose.Schema({});

module.exports = mongoose.model(
  "Device_Transaction",
  DevtransactionSchema,
  "DeviceTransaction"
);
