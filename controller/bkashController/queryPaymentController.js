const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");


const dotenv = require("dotenv");
dotenv.config();

var app_key = process.env.APP_KEY;
var base_URL = process.env.BASE_URL;

const queryPayment = async (req, res) => {
  try {
    const { paymentID } = req.body;
    const token = await getToken();
    payload = {
      paymentID,
    };
    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };
    const data = await axiosPost(`${base_URL}/payment/status`, payload, headers);

    res.send(data);
  } catch (error) {
    return error;
  }
};

module.exports = { queryPayment };
