const fs = require("fs");
var randomWords = require("random-words");
const { compact } = require("jsonld");
const queryAPI = require("../util/queryAPI");
const { getGoogle } = require("../util/queryOptions");

module.exports = getRandomGoogle = async () => {
  const query = `${randomWords()}-${randomWords()}`;
  const queryOptions = getGoogle(query);
  const result = await queryAPI(queryOptions);

  const compacted = await compact(result.data, {});

  const dataSet = {
    "@graph": compacted["http://schema.org/itemListElement"],
    "@type": query,
  };

  await fs.promises.writeFile(`datasets/google.json`, JSON.stringify(dataSet));

  const assets = Array.isArray(dataSet["@graph"])
    ? dataSet["@graph"].reduce((set, item) => {
        const type = item["http://schema.org/result"]["@type"];
        if (Array.isArray(type)) type.forEach((t) => set.add(t));
        else if (type) set.add(type);
        return set;
      }, new Set())
    : [];

  const keywords = Array.isArray(dataSet["@graph"])
    ? dataSet["@graph"].reduce((set, item) => {
        const id = item["http://schema.org/result"]["http://schema.org/name"];
        if (id) set.add(id);
        return set;
      }, new Set())
    : [];

  return { assets: [...assets], keywords: [...keywords] };
};
