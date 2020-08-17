const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
router.post("/add", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("please login in first");
    }
    let hashedPwd = await bcrypt.hash(req.body.password, 10);
    if (hashedPwd) {
      req.body.password = hashedPwd;
    } else {
      throw new Error("unfortunately it fails, please try later");
    }
    let newUser = new User(req.body);
    let result = await newUser.save();
    if (result) {
      result.password && delete result._doc.password;
      res.status(200).json({
        success: true,
        message: "successfully added",
        user: result,
      });
    } else {
      throw new Error("unfortunately it fails, please try later");
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
router.post("/update", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("please login in first");
    }
    let id = req.body.id;
    let updateRange = req.body;
    delete updateRange.id;
    let result = await User.findByIdAndUpdate(id, updateRange, {
      new: true,
    }).select("-password");
    if (result) {
      res.status(200).json({
        success: true,
        message: "successfully updated",
        user: result,
      });
    } else {
      throw new Error("unfortunately it fails, please try later");
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
router.post("/delete", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("please login in first");
    }
    let result = await User.findByIdAndDelete(req.body.id).select("-password");
    if (result) {
      res.status(200).json({
        success: true,
        message: "successfully deleted",
        user: result,
      });
    } else {
      throw new Error("unfortunately it fails, please try later");
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
router.get("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let results = await User.find().select("-password");
    if (results) {
      res.status(200).json({
        success: true,
        message: "successfully found",
        users: results,
      });
    } else {
      throw new Error("unfortunately it fails, please try again");
    }
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
module.exports = router;
