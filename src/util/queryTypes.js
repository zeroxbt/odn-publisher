const getRandomWikidata = require("../queries/queryWikidata");
const getRandomGoogle = require("../queries/queryGoogleKG");
const getRandomWeather = require("../queries/queryWeather");
const getRandomNewspaper = require("../queries/queryNewspaper");
const getRandomMarineRegions= require("../queries/queryMarineRegions");

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
  {
    name: "marine regions",
    getData: () => getRandomMarineRegions(),
    filepath: "datasets/marineregions.json",
  }
];

module.exports = {
  query: async function query(index){
    return queryTypes[index];
  },
  queryListLen: async function queryListLen(){
    return queryTypes.length;
  }
}
