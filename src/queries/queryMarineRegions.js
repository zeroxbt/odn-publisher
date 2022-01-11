const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getMarineRegions } = require("../util/queryOptions");

module.exports = getRandomMarineRegionsdata = async () => {
  const mrgid = Math.floor(Math.random() * (60000 - 1000 + 1) + 1000);
  let queryOptions = getMarineRegions(mrgid);
  const result = await queryAPI(queryOptions);

  fs.writeFileSync("datasets/marineregions.json", JSON.stringify(result.data));

  return {
    assets: [result.data["@type"]],
    keywords: [result.data["@id"]],
  };
};
