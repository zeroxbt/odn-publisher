const queryAPI = require("../util/queryAPI");
const { getWeather } = require("../util/queryOptions");

module.exports = getRandomWeatherdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    let queryOptions = getWeather().getStations();
    result = await queryAPI(queryOptions);
    const stationIndex = Math.floor(Math.random() * 499);
    const station = result.data.observationStations[stationIndex];
    const parse_array = station.split("/");
    const stationId = parse_array[parse_array.length - 1];
    queryOptions = getWeather().getObservations(stationId);
    result = await queryAPI(queryOptions);
    tries++;
  }

  delete result.data["@context"][1]["@version"];

  return result.data;
};
