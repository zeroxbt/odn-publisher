const getRandomWikidata = require("../apis/queryWikidata");
const getRandomGoogle = require("../apis/queryGoogleKG");
const getRandomWeather = require("../apis/queryWeather");
const getRandomNewspaper = require("../apis/queryNewspaper");
const getRandomMarineRegions = require("../apis/queryMarineRegions");
const getRandomDPLA = require("../apis/queryDPLA");
const getRandomArcticInfrastructure = require("../apis/queryArcticInfrastructure");

module.exports = [
  ...[
    {
      name: "wikidata",
      getData: () => getRandomWikidata(),
    },
    {
      name: "weather.gov",
      getData: () => getRandomWeather(),
    },
    {
      name: "marineregions.org",
      getData: () => getRandomMarineRegions(),
    },
    {
      name: "isaaffik.org on arctic infrastructure",
      getData: () => getRandomArcticInfrastructure(),
    },
  ],
  ...(process.env.GOOGLE_API_KEY
    ? [
        {
          name: "google",
          getData: () => getRandomGoogle(),
        },
      ]
    : []),
  ...(process.env.DPLA_KEY
    ? [
        {
          name: "digital public library of america",
          getData: () => getRandomDPLA(),
        },
      ]
    : []),
  ...(process.env.WSKEY
    ? [
        {
          name: "europeana.eu",
          getData: () => getRandomNewspaper(),
        },
      ]
    : []),
];
