const {axiosPost} = require("./postController")
// const dotenv = require("dotenv")
// dotenv.config()

const dotenv = require("dotenv");
dotenv.config();

var base_URL = process.env.BASE_URL;

const grantToken = async (username, password, app_key, app_secret) => {
  const payload = {
    app_key: app_key,
    app_secret: app_secret,
  };

  const headers = {
    username: username,
    password: password,
  };

  const data = await axiosPost(`${base_URL}/token/grant`, payload, headers);
  // console.log(data);
  return data;
};

const refreshToken = async (
  username,
  password,
  app_key,
  app_secret,
  refresh_token
) => {
  const payload = {
    app_key: app_key,
    app_secret: app_secret,
    refresh_token: refresh_token,
  };

  const headers = {
    username: username,
    password: password,
  };

  const data = await axiosPost(`${base_URL}/token/grant`, payload, headers);
  return data;
};

module.exports = {grantToken, refreshToken}
