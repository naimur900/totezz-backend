const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");


const dotenv = require("dotenv");
dotenv.config();

var app_key = process.env.APP_KEY;
var base_URL = process.env.BASE_URL;

const searchTransaction = async (trxID) => {
  try {
    const token = await getToken();
    payload = {
      trxID,
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

module.exports = { searchTransaction };
