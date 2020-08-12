const router = require("express").Router();
const Product = require("../models/product");
router.post("/add", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    console.log(req.body);
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
// router.post("/update", async (req, res) => {
//   try {
//     if (!req.isAuth) {
//       throw new Error("Unauthorized, please login first");
//     }
//     let name = req.body.name;
//     let id = req.body.id;
//     let category = await Category.findByIdAndUpdate(
//       id,
//       {
//         name,
//       },
//       { new: true }
//     );
//     console.log(category);
//     res.status(200).json({
//       success: true,
//       message: "update successfully",
//       category: category,
//     });
//   } catch (error) {
//     res.status(201).json({ success: false, message: error.toString() });
//   }
// });
router.get("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized, please login first");
    }
    let products = await Product.find(req.query);
    res.status(200).json({
      success: true,
      products: products,
      message:"successfully found desired products"
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.toString() });
  }
});
module.exports = router;
