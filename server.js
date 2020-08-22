/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middleware/authUser");
const path = require("path");

/* =======================
    LOAD THE CONFIG
==========================*/
const mongo_config = require("./config/mongo").mongo_config;
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, "public/build");

// Load routers
const login_route = require("./routes/login");
const register_route = require("./routes/register");
const category_route = require("./routes/category");
// upload to disk
// const upload_route = require("./routes/upload-disk");
//gcp upload
const upload_route = require("./routes/upload-gcp");
const product_route = require("./routes/product");
const role_route = require("./routes/role");
const user_router = require("./routes/user");

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(isAuth);
// app.use(express.static(__dirname + "/public"));
app.use(express.static(publicPath));
// // set the secret key variable for jwt
// app.set("jwt-secret", jwt_secret);
// configure api router
app.use("/api/login", login_route);
app.use("/api/register", register_route);
app.use("/api/admin/category", category_route);
app.use("/api/admin/upload", upload_route);
app.use("/api/admin/product", product_route);
app.use("/api/admin/role", role_route);
app.use("/api/admin/user", user_router);
// app.use("/product", product_route);
// index page, just for testing
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(publicPath, "/index.html"));
});
// (path.join(publicPath, 'index.html'));
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
    useCreateIndex: true,
  })
  .then(() => console.log("mongoDB connnection establised successfully"))
  .catch((err) => console.log("Error: " + err));
