const express = require("express");
const router = express.Router();
const site = require("../models/Customer");
const transaction = require("../models/DeviceTransaction");
const profile = require("../models/DeviceProfile");

// router.get("/", async (req, res) => {
//   try {
//     const All = await profile
//       .aggregate([
//         {
//           $lookup: {
//             from: transaction.collection.name,
//             localField: "_id",
//             foreignField: "DeviceID",
//             as: "ajas",
//           },
//         },
//       ])
//       .exec();
//     res.json(All);
//   } catch (err) {
//     res.json({ message: "Lol nope" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const All = await site
      .aggregate([
        {
          $project: {
            sites: 1,
          },
        },
        {
          $unwind: "$sites",
        },
        {
          $unwind: "$sites.locations",
        },
        {
          $lookup: {
            from: transaction.collection.name,
            localField: "sites.locations.Devices",
            foreignField: "DeviceID",
            as: "lol",
          },
        },
      ])
      .exec();
    res.json(All);
  } catch (err) {
    res.json({ message: "Lol nope" });
  }
});

// sites.locations.Devices

// router.get("/", async (req, res) => {
//   try {
//     const All = await transaction
//       .aggregate([
//         {
//           $lookup: {
//             from: site.collection.name,
//             localField: "DeviceID",
//             foreignField: "sites.locations.Devices",
//             as: "lol",
//           },
//         },
//         {
//           $project: {
//             lol: { sites: { name: 1, locations: { name: 1 } } },
//           },
//         },
//       ])
//       .exec();
//     res.json(All);
//   } catch (err) {
//     res.json({ message: "Lol nope" });
//   }
// });

module.exports = router;
