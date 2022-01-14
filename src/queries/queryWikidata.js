const queryAPI = require("../util/queryAPI");
const fs = require("fs");
const { compact } = require("jsonld");
const { getWikidata } = require("../util/queryOptions");

module.exports = getRandomWikidata = async () => {
  const dataId = Math.floor(Math.random() * 9999999);
  const queryOptions = getWikidata(dataId);
  const result = await queryAPI(queryOptions);

  const compacted = await compact(result.data, {});
  const firstElement = compacted["@graph"][0];
  const dataSet = {
    ...firstElement,
    "@graph": compacted["@graph"],
  };

  await fs.promises.writeFile(
    `datasets/wikidata.json`,
    JSON.stringify(dataSet)
  );
  
  const keywords = Array.isArray(dataSet["@graph"])
    ? dataSet["@graph"].reduce((set, item) => {
        const type = item["@type"];
        const name = item["http://schema.org/name"];
        if (type == "http://wikiba.se/ontology#Item") 
            if (Array.isArray(name)) [];
            else if (name) set.add(name["@value"]);
        return set;
      }, new Set())
    : [];
  console.log(keywords);
  return { assets: [dataSet["@type"]], keywords: [...keywords] };
};
