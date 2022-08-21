const queryAPI = require("../util/queryAPI");
const { getRandomDPLA } = require("../util/queryOptions");
const randomWords = require("random-words");

module.exports = getRandomDPLAdata = async () => {
  let words;
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    words = [randomWords(), randomWords()];
    const phrase = `${words[0]}+AND+${words[1]}`;
    const queryOptions = getRandomDPLA(phrase);
    result = await queryAPI(queryOptions);
    tries++;
  }

  return result.data.docs;
};
