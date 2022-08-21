const queryAPI = require("../util/queryAPI");
const { getWikidata } = require("../util/queryOptions");

module.exports = getRandomWikidata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const queryOptions = getWikidata();
    result = await queryAPI(queryOptions);
    tries++;
  }
  return result.data;
};
