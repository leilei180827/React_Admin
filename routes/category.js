const router = require("express").Router();
const Category = require("../models/category");
router.post("/add", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let newCategory = new Category({
      name: req.body.name,
      parentId: req.body.parentId,
    });
    let result = await newCategory.save();
    res.status(200).json({
      success: true,
      message: "added successfully",
      category: result,
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.post("/update", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let name = req.body.name;
    let id = req.body.id;
    let category = await Category.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "update successfully",
      category: category,
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.get("/info", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let category = await Category.findById(req.query.id);
    if (category) {
      res.status(200).json({
        success: true,
        category: category,
        message: "successfully found",
      });
    } else {
      throw new Error("Not Found");
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
    let categories = await Category.find({ parentId: req.query.parentId });
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});

module.exports = router;
