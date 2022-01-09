const axios = require("axios");
const fs = require("fs");
const randomWord = require("random-word");
const { compact } = require("jsonld");

const maxRetries = 3;

module.exports = getRandomWikidata = async () => {
  const query = randomWord();
  let result;
  let retries = 0;
  do {
    retries++;
    if (retries > maxRetries) {
      throw new Error("Error : unable to query googleapis.com");
    }
    result = await axios
      .get(
        `https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=${process.env.GOOGLE_API_KEY}&indent=true`
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

  await fs.promises.writeFile(`google.json`, JSON.stringify(dataSet));

  console.log("Finished writing dataset!");

  const assets = dataSet["@graph"].reduce((set, item) => {
    const type = item["http://schema.org/result"]["@type"];
    if (Array.isArray(type)) type.forEach((t) => set.add(t));
    else if (type) set.add(type);
    return set;
  }, new Set());

  const keywords = dataSet["@graph"].reduce((set, item) => {
    const id = item["http://schema.org/result"]["http://schema.org/name"];
    if (id) set.add(id);
    return set;
  }, new Set());

  return { assets: [], keywords: [...keywords] };
};
