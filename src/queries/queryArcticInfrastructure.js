const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getArcticInfrastructure } = require("../util/queryOptions");

module.exports = getRandomArcticInfradata = async () => {
  const pageIndex = Math.floor(Math.random() * 8);
  const infraIndex = Math.floor(Math.random() * 100);
  let queryOptions = getArcticInfrastructure().getRecord(pageIndex, 100);
  const result = await queryAPI(queryOptions);

  recordID = result.data["hydra:member"][infraIndex]["@id"];

  queryOptions = getArcticInfrastructure().getInfrastructure(recordID);
  const infra = await queryAPI(queryOptions);

  queryOptions = getArcticInfrastructure().getContext();
  const context = await queryAPI(queryOptions);

  const dataSet = {
    ...infra.data,
    "@context": context["@context"],
  };

  fs.writeFileSync(
    "datasets/arcticinfrastructure.json",
    JSON.stringify(dataSet)
  );

  return {
    assets: [dataSet["@type"]],
    keywords: [dataSet["@id"]],
  };
};
