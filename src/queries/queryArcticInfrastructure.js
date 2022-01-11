const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getArcticInfrastructure } = require("../util/queryOptions");

module.exports = getRandomArcticInfradata = async () => {
  const pageIndex = Math.floor(Math.random() * 7);
  const infraIndex = Math.floor(Math.random() * 100);
  let queryOptions = getArcticInfrastructure().getRecord(pageIndex, 100);
  const result = await queryAPI(queryOptions);

  recordID = result.data["hydra:member"][infraIndex]["@id"];

  queryOptions = getArcticInfrastructure().getInfrastructure(recordID);
  const infra = await queryAPI(queryOptions);

  fs.writeFileSync(
    "datasets/arcticinfrastructure.json",
    JSON.stringify(infra.data)
  );

  return {
    assets: [infra.data["@type"]],
    keywords: [infra.data["@id"]],
  };
};
