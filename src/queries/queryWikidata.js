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
    "@graph": compacted["@graph"].slice(1),
  };

  await fs.promises.writeFile(
    `datasets/wikidata.json`,
    JSON.stringify(dataSet)
  );

  return { assets: [dataSet["@type"]], keywords: [dataSet["@id"]] };
};
