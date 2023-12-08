const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter= require("./routes/authRoute")

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
port = process.env.mongo_url;

mongoose
  .connect(port)
  .then(() => {
    console.log("DB is connceted");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("auth/",authRouter)


app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
