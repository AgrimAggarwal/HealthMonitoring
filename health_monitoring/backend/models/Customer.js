const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({});

module.exports = mongoose.model("Customer", CustomerSchema, "Customer");
