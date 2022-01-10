const axios = require("axios");
const fs = require("fs");
var randomWords = require("random-words");
const { compact } = require("jsonld");

const maxRetries = 3;

const sleepForMilliseconds = async (milliseconds) => {
  await new Promise((r) => setTimeout(r, milliseconds));
};

module.exports = getRandomGoogle = async () => {
  const query = randomWords();
  const query2 = randomWords();
  let result;
  let retries = 0;
  do {
    sleepForMilliseconds(retries * 5 * 1000);
    retries++;
    if (retries > maxRetries) {
      throw new Error("Error : unable to query googleapis.com");
    }
    result = await axios
      .get(
        `https://kgsearch.googleapis.com/v1/entities:search?query=${query}-${query2}&key=${process.env.GOOGLE_API_KEY}&limit=500&indent=true`
      )
      .catch((error) => {
        console.log(`error querying googleapis.com ${error}`);
      });
  } while (!result);

  const compacted = await compact(result.data, {});

  const dataSet = {
    "@graph": compacted["http://schema.org/itemListElement"],
    "@type": query,
  };

  await fs.promises.writeFile(
    `../datasets/wikidata.json`,
    JSON.stringify(dataSet)
  );

  console.log("Finished writing dataset!");

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
