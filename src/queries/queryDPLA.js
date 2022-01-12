const fs = require("fs");
const { compact } = require("jsonld");
const queryAPI = require("../util/queryAPI");
const { getRandomDPLA } = require("../util/queryOptions");
var randomWords = require("random-words");

module.exports = getRandomDPLAdata = async () => {
  const phrase = `${randomWords()}-${randomWords()}`;
  let queryOptions = getRandomDPLA(phrase);
  const result = await queryAPI(queryOptions);

  const dataSet = result.data;
  //just write the first doc returned
  fs.writeFileSync("datasets/dpla.json", JSON.stringify(dataSet));

  const assets = Array.isArray(dataSet.docs)
    ? dataSet.docs.reduce((set, item) => {
        const type = item["@type"];
        if (Array.isArray(type)) type.forEach((t) => set.add(t));
        else if (type) set.add(type);
        return set;
      }, new Set())
    : [];

  const keywords = Array.isArray(dataSet.docs)
    ? dataSet.docs.reduce((set, item) => {
        const id = item["@id"];
        if (id) set.add(id);
        return set;
      }, new Set())
    : [];

  return { assets: [...assets], keywords: [...keywords] };
};
