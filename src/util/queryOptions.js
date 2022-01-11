exports.getWikidata = (dataId) => ({
  url: `https://www.wikidata.org/wiki/Special:EntityData/Q${dataId}.jsonld`,
  config: {},
});

exports.getGoogle = (query) => ({
  url: `https://kgsearch.googleapis.com/v1/entities:search?`,
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
    url: `https://api.weather.gov/stations?`,
    config: {
      params: {
        limit: 500,
      },
    },
  }),
  getObservations: (stationId) => ({
    url: `https://api.weather.gov/stations/${stationId}/observations/latest?`,
    config: {
      params: {
        require_qc: false,
      },
    },
  }),
});

exports.getNewspaper = () => ({
  getRecord: (queryWord) => ({
    url: `https://newspapers.eanadev.org/api/v2/search.json?`,
    config: {
      params: {
        query: queryWord,
        profile: "hits",
        wskey: process.env.WSKEY,
      },
    },
  }),
  getManifest: (recordID) => ({
    url: `https://iiif.europeana.eu/presentation/${recordID}/manifest`,
    config: {
      params: {
        //
      },
    },
  }),
});

exports.getMarineRegions = (mrgid) => ({
  url: `https://www.marineregions.org/rest/getGazetteerRecordByMRGID.jsonld/${mrgid}/`,
  config: {
    params: {
      //
    },
  },
});

exports.getRandomDPLA = (phrase) => ({
  url: `https://api.dp.la/v2/items?`,
  config: {
    params: {
      q: phrase,
      api_key: process.env.DPLA_KEY,
    },
  },
});

exports.getArcticInfrastructure = () => ({
  getRecord: (page, itemsPerPage) => ({
    url: `https://isaaffik.org/api/infrastructures.jsonld?`,
    config: {
      params: {
        page,
        itemsPerPage,
        pagination: true,
      },
    },
  }),
  getInfrastructure: (recordID) => ({
    url: `https://isaaffik.org${recordID}/`,
    config: {
      params: {
        //
      },
    },
  }),
});
