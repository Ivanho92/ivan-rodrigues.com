const fetch = require("node-fetch");
const { prepareData } = require("./prepare-data");

const getCVLinks = async () => {
  const preparedData = await prepareData();
  const response = await fetch(process.env.CV_GENERATOR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedData),
  });
  const { urls } = await response.json();
  return urls;
};

module.exports = getCVLinks;
