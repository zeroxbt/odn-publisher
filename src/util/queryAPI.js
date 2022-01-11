const axios = require("axios");

module.exports = queryAPI = async (queryOptions) => {
  return await axios.get(queryOptions).catch((error) => {
    console.log(`error querying ${queryOptions.path} : ${error}.`);
  });
};
