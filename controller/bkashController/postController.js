const axios = require("axios");

const axiosPost = async (endPointURL, payload, headers) => {
  const controller = new AbortController();

  const timeOut = setTimeout(() => {
    controller.abort();
  }, 30000);

  const { data } = await axios({
    method: "post",
    url: endPointURL,
    data: payload,
    headers: headers,
    signal: controller.signal,
  });

  clearTimeout(timeOut);
  if (data.errorMessage) throw new Error(data.errorMessage);
  return data;
};

module.exports = { axiosPost };
