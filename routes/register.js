const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt_secret = require("../config/jwt").secret;
const jwt= require("jsonwebtoken");
router.post("/", (req, res) => {
    let username = req.body.username,
    password = req.body.password;
    try{
        const alreadyExisted = await User.findOne({username});
        if (alreadyExisted) throw new Error("Email already exists");
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
        });
    const createdUser = await user.save();
    const token = jwt.sign({ user_id:createdUser.id,username: createdUser.username },jwt_secret,{expiresIn: "1h"});
    res.json(200)({
        success: true,
        message: "Logged in successfully",
        token: `Bearer ${token}`,
        user: {
            id: createdUser._id,
            username: createdUser.username,
        },
    });
}catch(error){
            res.json(501)({ success: false, message: error });
        }
    });
module.exports = router;





