const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter= require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongouri = process.env.MONGO_URI;
port= process.env.PORT

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("DB is connceted");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/user",userRouter);





app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

