const getRandomWikidata = require("./src/queryWikidata");
const getRandomGoogle = require("./src/queries/queryGoogleKG");

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
];

module.exports = randomQuery = () => {
  const randomIndex = Math.floor(Math.random() * queryTypes.length);
  return (randomQuery = queryTypes[randomIndex]);
};
