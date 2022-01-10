const getRandomWikidata = require("../queries/queryWikidata");
const getRandomGoogle = require("../queries/queryGoogleKG");
const getRandomWeather = require("../queries/queryWeather");

const queryTypes = [
  {
    name: "wikidata",
    getData: () => getRandomWikidata(),
    filepath: "datasets/wikidata.json",
  },
  {
    name: "google",
    getData: () => getRandomGoogle(),
    filepath: "datasets/google.json",
  },
  {
    name: "weather",
    getData: () => getRandomWeather(),
    filepath: "datasets/weather.json",
  },
];

module.exports = randomQuery = () => {
  const randomIndex = Math.floor(Math.random() * queryTypes.length);
  return queryTypes[randomIndex];
};
