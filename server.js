/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middleware/authUser");

/* =======================
    LOAD THE CONFIG
==========================*/
const mongo_config = require("./config").mongo_config;
const port = process.env.PORT || 5000;

// Load routers
const login_route = require("./routes/login");
const register_route = require("./routes/register");
const category_route = require("./routes/category");
const upload_route = require("./routes/upload");

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);
app.use(express.static(__dirname + "/public"));
// app.use(express.static('public'));
// print the request log on console
// app.use(morgan("dev"));

// // set the secret key variable for jwt
// app.set("jwt-secret", jwt_secret);
// configure api router
app.use("/login", login_route);
app.use("/register", register_route);
app.use("/admin/category", category_route);
app.use("/admin/upload", upload_route);
// app.use("/product", product_route);
// index page, just for testing
app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/api", require("./routes/api"));

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose
  .connect(mongo_config, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connnection establised successfully"))
  .catch((err) => console.log("Error: " + err));
