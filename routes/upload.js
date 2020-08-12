const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "./../public/upload");
    fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.parse(file.originalname).ext
    );
  },
});
// const upload = multer({ storage }).single("image");
const upload = multer({ storage });
router.post("/add", upload.single("image"), (req, res, next) => {
  try {
    const url =
      req.protocol + "://" + req.headers.host + "/upload/" + req.file.filename;
    if (!req.file) throw new Error("error happens");
    res.status(200).json({
      success: true,
      message: "upload successes",
      file: {
        name: req.file.filename,
        url,
      },
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.toString(),
    });
  }
  // upload(req, res, (err) => {
  //   if (err) {
  //     res.status(201).json({
  //       success: false,
  //       message: error.toString(),
  //     });
  //   } else {
  //     res.status(200).json({
  //       success: true,
  //       message: "upload successes",
  //       name: res.req.file.filename,
  //       url: res.req.file.path,
  //     });
  //   }
  // });
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
  // upload(req, res, (err) => {
  //   if (err) {
  //     res.status(201).json({
  //       success: false,
  //       message: error.toString(),
  //     });
  //   } else {
  //     res.status(200).json({
  //       success: true,
  //       message: "upload successes",
  //       name: res.req.file.filename,
  //       url: res.req.file.path,
  //     });
  //   }
  // });
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
  // upload(req, res, (err) => {
  //   if (err) {
  //     res.status(201).json({
  //       success: false,
  //       message: error.toString(),
  //     });
  //   } else {
  //     res.status(200).json({
  //       success: true,
  //       message: "upload successes",
  //       name: res.req.file.filename,
  //       url: res.req.file.path,
  //     });
  //   }
  // });
});
module.exports = router;
