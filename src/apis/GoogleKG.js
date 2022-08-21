const randomWords = require("random-words");
const fetchData = require("../util/fetchData");
const { getGoogle } = require("../util/apiOptions");

module.exports = getRandomGoogle = async () => {
  let result;
  let query;
  let tries = 0;
  let words = [];
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    words.push(randomWords());
    words.push(randomWords());
    query = `${words[0]}-${words[1]}`;
    const apiOptions = getGoogle(query);
    result = await fetchData(apiOptions);
    tries++;
  }

  return result.data;
};
