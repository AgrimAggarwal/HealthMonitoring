const express = require("express");
const router = express.Router();
const site = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const All = await site.find({}, { sites: 1, _id: 0 });
    res.json(All);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
