const fetchData = require("../util/fetchData");
const { getMarineRegions } = require("../util/apiOptions");

module.exports = getRandomMarineRegionsdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const mrgid = Math.floor(Math.random() * (60000 - 1000 + 1) + 1000);
    let apiOptions = getMarineRegions(mrgid);
    result = await fetchData(apiOptions);
    tries++;
  }

  return result.data;
};
