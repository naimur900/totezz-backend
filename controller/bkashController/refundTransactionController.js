const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");


const dotenv = require("dotenv");
dotenv.config();

var app_key = process.env.APP_KEY;
var base_URL = process.env.BASE_URL;

const refundTransaction = async () => {
  try {
    const { trxID, amount, paymentID, reason, sku } = req.body;
    const token = await getToken();
    payload = {
      trxID,
      amount,
      paymentID,
      reason: reason ?? "Refund",
      sku: sku ?? "NA",
    };
    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };
    const data = await axiosPost(
      `${base_URL}/general/searchTransaction`,
      payload,
      headers
    );
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { refundTransaction };
