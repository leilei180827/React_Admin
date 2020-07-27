const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt_secret = require("../config").secret;
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  //already login
  if (req.isAuth) {
    res.status(200).json({
      success: true,
      user: {
        username: req.username,
      },
    });
  }
  //first time login or token expires
  let username = req.body.username,
    password = req.body.password;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("user not found");
      // res.json(501)({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect Password!");
      // res.json(501)({ success: false, message: "Incorrect Password!" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwt_secret,
      {
        expiresIn: "1h",
      }
    );
    res.json(200)({
      success: true,
      message: "Logged in successfully",
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, message: error.toString() });
  }
});
module.exports = router;
