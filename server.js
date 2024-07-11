const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const wishListRouter = require("./routes/wishListRoute");
const reviewRouter = require("./routes/reviewRoute");


const {createPaymentRouter} = require("./routes/bkashRoutes/createPaymentRoute");
const {executePaymentRouter} = require("./routes/bkashRoutes/executePaymentRoute");
const {refundTransactionRouter} = require("./routes/bkashRoutes/refundTransactionRoute");


const cors = require("cors");



dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongouri = process.env.MONGO_URI;
port = process.env.PORT;

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("DB is connceted");
  })
  .catch((error) => {
    console.log(error.message);
  });


var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishListRouter);
app.use("/review", reviewRouter);


app.use("/", createPaymentRouter);
app.use("/", executePaymentRouter);
app.use("/", refundTransactionRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
