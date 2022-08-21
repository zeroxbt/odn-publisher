const context = require("../../contexts/dpla.json")
const fetchData = require("../util/fetchData");
const { getRandomDPLA } = require("../util/apiOptions");
const randomWords = require("random-words");

module.exports = getRandomDPLAdata = async () => {
  let words;
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    words = [randomWords(), randomWords()];
    const phrase = `${words[0]}+AND+${words[1]}`;
    const apiOptions = getRandomDPLA(phrase);
    result = await fetchData(apiOptions);
    tries++;
  }

  result.data.docs.forEach((x) => delete x["@context"]);

  return {"@graph": result.data.docs, "@context": context};
};
