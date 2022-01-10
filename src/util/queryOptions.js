exports.getWikidata = (dataId) => ({
  path: `https://www.wikidata.org/wiki/Special:EntityData/Q${dataId}.jsonld`,
  config: {},
});

exports.getGoogle = (query) => ({
  path: `https://kgsearch.googleapis.com/v1/entities:search?`,
  config: {
    params: {
      ...(query && { query }),
      key: process.env.GOOGLE_API_KEY,
      limit: 500,
      indent: true,
    },
  },
});

exports.getWeather = () => ({
  getStations: () => ({
    path: `https://api.weather.gov/stations?`,
    config: {
      params: {
        limit: 500,
      },
    },
  }),
  getObservations: (stationId) => ({
    path: `https://api.weather.gov/stations/${stationId}/observations/latest?`,
    config: {
      params: {
        require_qc: false,
      },
    },
  }),
});
