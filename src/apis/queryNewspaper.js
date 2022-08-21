const queryAPI = require("../util/queryAPI");
const { getNewspaper } = require("../util/queryOptions");
var randomWords = require("random-words");

module.exports = getRandomNewspaperdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const queryWord = randomWords();
    let queryOptions = getNewspaper().getRecord(queryWord);
    result = await queryAPI(queryOptions);
    const randomHit = Math.floor(Math.random() * result.data.hits.length);
    const recordID = result.data.hits[randomHit].scope;
    queryOptions = getNewspaper().getManifest(recordID);
    result = await queryAPI(queryOptions);
    tries++;
  }

  return result.data;
};
