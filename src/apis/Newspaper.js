const fetchData = require("../util/fetchData");
const { getNewspaper } = require("../util/apiOptions");
var randomWords = require("random-words");

module.exports = getRandomNewspaperdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const queryWord = randomWords();
    let apiOptions = getNewspaper().getRecord(queryWord);
    result = await fetchData(apiOptions);
    const randomHit = Math.floor(Math.random() * result.data.hits.length);
    const recordID = result.data.hits[randomHit].scope;
    apiOptions = getNewspaper().getManifest(recordID);
    result = await fetchData(apiOptions);
    tries++;
  }

  return result.data;
};
