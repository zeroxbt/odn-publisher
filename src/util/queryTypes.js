const getRandomWikidata = require("../queries/queryWikidata");
const getRandomGoogle = require("../queries/queryGoogleKG");
const getRandomWeather = require("../queries/queryWeather");
const getRandomNewspaper = require("../queries/queryNewspaper");

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
  {
    name: "newspaper",
    getData: () => getRandomNewspaper(),
    filepath: "datasets/newspaper.json",
  },
];

// module.exports = randomQuery = () => {
//   const randomIndex = Math.floor(Math.random() * queryTypes.length);
//   return queryTypes[randomIndex];
// };

module.exports = {
  query: async function query(index){
    return queryTypes[index];
  },
  queryListLen: async function queryListLen(){
    return queryTypes.length;
  }
}
