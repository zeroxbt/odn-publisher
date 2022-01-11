const fs = require("fs");
const { compact } = require("jsonld");
const queryAPI = require("../util/queryAPI");
const { getRandomDPLA } = require("../util/queryOptions");
var randomWords = require("random-words");

module.exports = getRandomDPLAdata = async () => {
  const phrase = `${randomWords()}-${randomWords()}`;
  let queryOptions = getRandomDPLA(phrase);
  const result = await queryAPI(queryOptions);

  let dataSet = {
    "@context": "http://dp.la/api/items/context",
    "@type": phrase,
    "@graph": result.data.docs,
  };
  dataSet["@graph"].forEach((item) => delete item["@context"]);
  dataSet = await compact(dataSet, {});
  console.log(dataSet);
  //just write the first doc returned
  fs.writeFileSync("datasets/dpla.json", JSON.stringify(dataSet));

  const assets = Array.isArray(dataSet["@graph"])
    ? dataSet["@graph"].reduce((set, item) => {
        const type = item["@type"];
        if (Array.isArray(type)) type.forEach((t) => set.add(t));
        else if (type) set.add(type);
        return set;
      }, new Set())
    : [];

  const keywords = Array.isArray(dataSet["@graph"])
    ? dataSet["@graph"].reduce((set, item) => {
        const id = item["@id"];
        if (id) set.add(id);
        return set;
      }, new Set())
    : [];

  console.log("keywords : " + keywords);
  console.log("assets : " + assets);

  return { assets: [...assets], keywords: [...keywords] };
};
