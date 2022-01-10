const axios = require("axios");
const fs = require("fs");
const { compact } = require("jsonld");

const maxRetries = 5;

const sleepForMilliseconds = async (milliseconds) => {
  await new Promise((r) => setTimeout(r, milliseconds));
};

module.exports = getRandomWikidata = async () => {
  const dataId = Math.floor(Math.random() * 9999999);
  let result;
  let retries = 0;
  do {
    retries++;
    if (retries > maxRetries) {
      throw new Error("Error : unable to query wikidata.org");
    }
    await sleepForMilliseconds(retries * 10 * 1000);
    result = await axios
      .get(`https://www.wikidata.org/wiki/Special:EntityData/Q${dataId}.jsonld`)
      .catch((error) => {
        console.log(`error querying wikidata.org. ${error}`);
      });
  } while (!result);

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

  console.log("Finished writing dataset!");

  return { assets: [dataSet["@type"]], keywords: [dataSet["@id"]] };
};
