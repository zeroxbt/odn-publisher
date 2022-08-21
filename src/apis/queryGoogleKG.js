const randomWords = require("random-words");
const queryAPI = require("../util/queryAPI");
const { getGoogle } = require("../util/queryOptions");

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
    const queryOptions = getGoogle(query);
    result = await queryAPI(queryOptions);
    tries++;
  }

  return result.data;
};
