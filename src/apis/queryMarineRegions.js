const queryAPI = require("../util/queryAPI");
const { getMarineRegions } = require("../util/queryOptions");

module.exports = getRandomMarineRegionsdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const mrgid = Math.floor(Math.random() * (60000 - 1000 + 1) + 1000);
    let queryOptions = getMarineRegions(mrgid);
    result = await queryAPI(queryOptions);
    tries++;
  }

  return result.data;
};
