exports.getWikidata = (dataId) => ({
  path: `https://www.wikidata.org/wiki/Special:EntityData/Q${dataId}.jsonld`,
  config: {},
});

exports.getGoogle = (query) => ({
  path: `https://kgsearch.googleapis.com/v1/entities:search?`,
  config: {
    params: {
      query,
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

exports.getNewspaper = () => ({
  getRecord: (queryWord) => ({
    path: `https://newspapers.eanadev.org/api/v2/search.json?`,
    config: {
      params: {
        query: queryWord,
        profile: "hits",
        wskey: process.env.WSKEY,
      },
    },
  }),
  getManifest: (recordID) => ({
    path: `https://iiif.europeana.eu/presentation/${recordID}/manifest`,
    config: {
      params: {
        //
      },
    },
  }),
});

exports.getMarineRegions = (mrgid) => ({
  path: `https://www.marineregions.org/rest/getGazetteerRecordByMRGID.jsonld/${mrgid}/`,
  config: {
    params: {
      //
    },
  },
});

exports.getRandomDPLA = (phrase) => ({
  path: `https://api.dp.la/v2/items?`,
  config: {
    params: {
      q: phrase,
      api_key: process.env.DPLA_KEY,
    },
  },
});
