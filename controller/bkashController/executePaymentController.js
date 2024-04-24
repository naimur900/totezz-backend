const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");



const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const executePayment = async (req, res) => {
  try {
    const { paymentID } = req.body;
    const token = await getToken();
    console.log("Token from executePayment function");
    payload = {
      paymentID,
    };

    console.log(paymentID);
    headers = {
      "Authorization": token,
      "X-App-Key": app_key,
      "Accept":	"application/json"
    };

    const data = await axiosPost(`${base_URL}/execute`, payload, headers);
    console.log(data);
    // res.status(200).json({
    //   status: 200,
    //   message: data,
    // });
    res.send(data);
  } catch (error) {
    return error;
  }
};

module.exports = { executePayment };
