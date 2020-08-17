const router = require("express").Router();
const Product = require("../models/product");
router.post("/add", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let newProduct = new Product(req.body);
    let result = await newProduct.save();
    res.status(200).json({
      success: true,
      message: "added successfully",
      product: result,
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
    let id = req.body.id;
    let updateRange = req.body;
    delete updateRange.id;
    let product = await Product.findByIdAndUpdate(
      id,
      {
        $set: updateRange,
      },
      { new: true }
    );
    if (product) {
      res.status(200).json({
        success: true,
        message: "update successfully",
        product: product,
      });
    } else {
      throw new Error("update fails");
    }
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.get("/search", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let keyword = req.query.q;
    let filter = {
      $or: [
        // multiple
        { name: { $regex: keyword } },
        { keywords: { $regex: keyword, $options: "$i" } }, //  $options: '$i' ignore uppercase/lowercase
        { description: { $regex: keyword, $options: "$i" } },
      ],
    };
    let products = await Product.find(filter);
    res.status(200).json({
      success: true,
      products: products,
      message: "successfully found desired products",
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
router.get("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let products = await Product.find(req.query);
    res.status(200).json({
      success: true,
      products: products,
      message: "successfully found desired products",
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
module.exports = router;
