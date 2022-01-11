const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getRandomDPLA } = require("../util/queryOptions");
var randomWords = require("random-words");

module.exports = getRandomDPLAdata = async () => {
  const phrase = `${randomWords()}-${randomWords()}`;
  let queryOptions = getRandomDPLA(phrase);
  const result = await queryAPI(queryOptions);

  //just write the first doc returned
  fs.writeFileSync("datasets/dpla.json", JSON.stringify(result.data));

  return {
    assets: [result.data.docs[0]["@type"]],
    keywords: [result.data.docs[0]["@id"]],
  };
};
