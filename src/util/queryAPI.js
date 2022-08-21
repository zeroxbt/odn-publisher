const axios = require("axios");

module.exports = queryAPI = async (queryOptions) => {
  return await axios
    .get(queryOptions.path, queryOptions.config)
    .catch((error) => {
      console.log(
        `error querying ${queryOptions.path} : ${error}. Retrying...`
      );
    });
};
