const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadImage = require("../helpers/helper");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    let names = imageUrl.split("/");
    const name = names[names.length - 1];
    res.status(200).json({
      success: true,
      message: "Upload was successful",
      file: {
        url: imageUrl,
        name,
      },
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
router.post("/delete", (req, res, next) => {
  try {
    const fileName = req.body.name;
    const filePath = path.join(__dirname, "./../public/upload/", fileName);
    fs.unlink(filePath, (error) => {
      if (error) throw new Error("delete fails:" + error.toString());
      res.status(200).json({
        succuss: true,
        message: "successfully removed",
      });
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
router.post("/adds", upload.array("images", 5), (req, res, next) => {
  try {
    console.log(req);
    const files = req.files;
    console.log(files);
    if (!files) throw new Error("nothing uploaded");
    res.status(200).json({
      success: true,
      message: "upload successes",
      files: files,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
});
module.exports = router;
