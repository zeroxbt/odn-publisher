const axios = require("axios");

const sleepForMilliseconds = async (milliseconds) => {
  await new Promise((r) => setTimeout(r, milliseconds));
};

module.exports = queryAPI = async (queryOptions) => {
  const maxRetries = 3;
  let result;
  let retries = 0;
  do {
    sleepForMilliseconds(retries * 5 * 1000);
    retries++;
    if (retries > maxRetries) {
      throw new Error(`Error : unable to query ${queryOptions.path}`);
    }
    result = await axios
      .get(queryOptions.path, queryOptions.config)
      .catch((error) => {
        console.log(
          `error querying ${queryOptions.path} : ${error}.\n Retrying...`
        );
      });
  } while (!result);
  return result;
};
