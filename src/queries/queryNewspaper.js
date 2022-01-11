const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getNewspaper } = require("../util/queryOptions");
var randomWords = require("random-words");

module.exports = getRandomNewspaperdata = async () => {
  const queryWord = randomWords();
  let queryOptions = getNewspaper().getRecord(queryWord);
  const result = await queryAPI(queryOptions);
  recordID = result.data.hits[0].scope;

  queryOptions = getNewspaper().getManifest(recordID);
  const manifest = await queryAPI(queryOptions);

  fs.writeFileSync("datasets/newspaper.json", JSON.stringify(manifest.data));

  return {
    assets: [manifest.data["@type"]],
    keywords: [manifest.data["@id"]],
  };
};
