const getRandomWikidata = require("../queries/queryWikidata");
const getRandomGoogle = require("../queries/queryGoogleKG");
const getRandomWeather = require("../queries/queryWeather");
const getRandomNewspaper = require("../queries/queryNewspaper");
const getRandomMarineRegions = require("../queries/queryMarineRegions");
const getRandomDPLA = require("../queries/queryDPLA");
const getRandomArcticInfrastructure = require("../queries/queryArcticInfrastructure");
const getRandomArcticMapData = require("../queries/queryArcticMapData");

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
    name: "weather.gov",
    getData: () => getRandomWeather(),
    filepath: "datasets/weather.json",
  },
  {
    name: "europeana.eu",
    getData: () => getRandomNewspaper(),
    filepath: "datasets/newspaper.json",
  },
  {
    name: "marineregions.org",
    getData: () => getRandomMarineRegions(),
    filepath: "datasets/marineregions.json",
  },
  {
    name: "digital public library of america",
    getData: () => getRandomDPLA(),
    filepath: "datasets/dpla.json",
  },
  {
    name: "isaaffik.org on arctic infrastructure",
    getData: () => getRandomArcticInfrastructure(),
    filepath: "datasets/arcticinfrastructure.json",
  },
    {
    name: "isaaffik.org on arctic map data",
    getData: () => getRandomArcticMapData(),
    filepath: "datasets/arcticmapdata.json",
  },
];

module.exports = {
  query: function query(index) {
    return queryTypes[index];
  },
  queryListLen: function queryListLen() {
    return queryTypes.length;
  },
};
