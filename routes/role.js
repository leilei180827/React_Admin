const express = require("express");
const router = express.Router();
const Role = require("../models/role");
router.post("/add", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let newRole = new Role({
      name: req.body.name,
    });
    let result = await newRole.save();
    if (result) {
      res.status(200).json({
        success: true,
        message: "added successfully",
        role: result,
      });
    } else {
      throw new Error("unfortunately the operation fails, please try again");
    }
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.post("/update", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let id = req.body.id;
    let updateRange = req.body;
    delete updateRange.id;
    // if (updateRange.auth_time) {
    //   updateRange.auth_time = new Date(updateRange.auth_time);
    // }
    let role = await Role.findByIdAndUpdate(
      id,
      {
        $set: updateRange,
      },
      { new: true }
    );
    if (role) {
      res.status(200).json({
        success: true,
        message: "update successfully",
        role: role,
      });
    } else {
      throw new Error("update fails");
    }
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.get("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let results = await Role.find();
    if (results) {
      res.status(200).json({
        success: true,
        message: "successfully found",
        roles: results,
      });
    } else {
      throw new Error("unfortunately it fails, please try again");
    }
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
module.exports = router;
