const fetchData = require("../util/fetchData");
const { getWikidata } = require("../util/apiOptions");

module.exports = getRandomWikidata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const apiOptions = getWikidata();
    result = await fetchData(apiOptions);
    tries++;
  }
  return result.data;
};
