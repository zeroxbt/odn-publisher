const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getWeather } = require("../util/queryOptions");

module.exports = getRandomWeatherdata = async () => {
  const stationIndex = Math.floor(Math.random() * 499);
  let queryOptions = getWeather().getStations();
  const result = await queryAPI(queryOptions);

  const station = result.data.observationStations[stationIndex];
  const parse_array = station.split("/");
  const stationId = parse_array[parse_array.length - 1];

  queryOptions = getWeather().getObservations(stationId);
  const latest_station_observations = await queryAPI(queryOptions);

  delete latest_station_observations.data["@context"][1]["@version"];

  fs.writeFileSync(
    "datasets/weather.json",
    JSON.stringify(latest_station_observations.data));

  return {
    assets: [latest_station_observations.data.properties["@type"]],
    keywords: [latest_station_observations.data.properties["@id"]],
  };
};
