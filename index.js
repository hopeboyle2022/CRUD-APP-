var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://hopeboyle2023:2VZQAKda2tl63MPj@cluster0.fjvvu4q.mongodb.net/phoneCompany"
);

const UserRouter = require("./routers/User.js");
const OrderRouter = require("./routers/orders.js");
const productsRouter = require("./routers/products.js");

app.use(UserRouter);
app.use(OrderRouter);
app.use(productsRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
