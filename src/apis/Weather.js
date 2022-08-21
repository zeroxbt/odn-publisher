const fetchData = require("../util/fetchData");
const { getWeather } = require("../util/apiOptions");

module.exports = getRandomWeatherdata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    let apiOptions = getWeather().getStations();
    result = await fetchData(apiOptions);
    const stationIndex = Math.floor(Math.random() * 499);
    const station = result.data.observationStations[stationIndex];
    const parse_array = station.split("/");
    const stationId = parse_array[parse_array.length - 1];
    apiOptions = getWeather().getObservations(stationId);
    result = await fetchData(apiOptions);
    tries++;
  }

  delete result.data["@context"][1]["@version"];

  return result.data;
};
