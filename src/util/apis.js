const getRandomWikidata = require("../queries/queryWikidata");
const getRandomGoogle = require("../queries/queryGoogleKG");
const getRandomWeather = require("../queries/queryWeather");
const getRandomNewspaper = require("../queries/queryNewspaper");
const getRandomMarineRegions = require("../queries/queryMarineRegions");
const getRandomDPLA = require("../queries/queryDPLA");
const getRandomArcticInfrastructure = require("../queries/queryArcticInfrastructure");

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
