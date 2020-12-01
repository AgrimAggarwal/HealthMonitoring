const express = require("express");
const router = express.Router();
const transaction = require("../models/DeviceTransaction");
const mongoose = require("mongoose");

// router.get("/", (req, res) => {
//   res.send("Lol");
// });

router.get("/", async (req, res) => {
  try {
    const All = await transaction.find();
    res.json(All);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/alert", async (req, res) => {
  try {
    const alert = await transaction.aggregate([
      {
        $group: { _id: "$DeviceID" },
      },
    ]);
    res.json(alert);
  } catch (err) {
    res.json({ message: lol });
  }
});

router.get("/alert/safe", async (req, res) => {
  try {
    const safelol = await transaction.aggregate([
      {
        $group: {
          _id: "$DeviceID",
          count: { $sum: 1 },
          totalsafe: { $sum: "$Alert.Message" },
        },
      },
      {
        $project: {
          count: 1,
          totalsafe: 1,
          _id: 1,
          unsafe: {
            $subtract: ["$count", "$totalsafe"],
          },
        },
      },
    ]);
    res.json(safelol);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/alert/safe/:DeviceId", async (req, res) => {
  try {
    const id = req.params.DeviceId;
    const safelol1 = await transaction.aggregate([
      {
        $project: {
          DeviceID: 1,
          Alert: { Message: 1 },
        },
      },
      {
        $match: { DeviceID: mongoose.Types.ObjectId(id) },
      },
      {
        $group: {
          _id: "$DeviceID",
          count: { $sum: 1 },
          totalsafe: { $sum: "$Alert.Message" },
        },
      },
      {
        $project: {
          count: 1,
          totalsafe: 1,
          _id: 1,
          unsafe: {
            $subtract: ["$count", "$totalsafe"],
          },
        },
      },
    ]);
    res.json(safelol1);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

// db.DeviceTransaction.aggregate([
//   {​​$group : {​​"_id" : "$DeviceID", "count" : {​​"$sum" : 1}, "totalsafe" : {​​"$sum" : "$Alert.Message"}​​}​​}​​
//   ])

// db.DeviceTransaction.aggregate([
//   {​​$group : {​​"_id" : "$DeviceID", "totalsafe" : {​​"$sum" : "$Alert.Message"}​​}​​}​​
//   ])

// db.DeviceTransaction.aggregate([
//   {
//     $group : { _id : "$DeviceID" },
//   }
//   {
//     $match : {
//       _id : "560c24b853b558856ef193a3"
//     },
//   }
//   {
//     $project : {
//       _id : 1
//     }
//   }
//   ])
