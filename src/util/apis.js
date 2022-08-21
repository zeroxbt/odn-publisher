const getRandomWikidata = require("../apis/Wikidata");
const getRandomGoogle = require("../apis/GoogleKG");
const getRandomWeather = require("../apis/Weather");
const getRandomNewspaper = require("../apis/Newspaper");
const getRandomMarineRegions = require("../apis/MarineRegions");
const getRandomDPLA = require("../apis/DPLA");
const getRandomArcticInfrastructure = require("../apis/ArcticInfrastructure");

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
