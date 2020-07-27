const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt_secret = require("../config/jwt").secret;
const jwt= require("jsonwebtoken");
router.post("/",(req,res)=>{
    //already login 
    if(req.isAuth){
        res.json(200)({
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
        const user = await User.findOne({ username});
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect Password!");
        }
        const token = jwt.sign(
          { userId:user.id,username: user.username },
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
        res.json(501)({ success: false, message: error });
      }
})
module.exports = router;
