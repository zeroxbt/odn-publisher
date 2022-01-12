const fs = require("fs");
const queryAPI = require("../util/queryAPI");
const { getArcticMapData } = require("../util/queryOptions");

module.exports = getRandomArcticMapData = async () => {
  const pageIndex = Math.floor(Math.random() * 560);
  let queryOptions = getArcticMapData().getRecord(pageIndex, 100)
  const result = await queryAPI(queryOptions);

  const mapIndex =Math.floor(
    Math.random() * result.data["hydra:member"].length
  );
  recordID = result.data['hydra:member'][mapIndex]["@id"];

  queryOptions = getArcticMapData().getMapData(recordID);
  const mapdata = await queryAPI(queryOptions);

  queryOptions = getArcticMapData().getContext();
  const context = await queryAPI(queryOptions);

  const dataSet = {
    ...mapdata.data,
    "@context": context["@context"],
  };


  fs.writeFileSync(
    "datasets/arcticmapdata.json",
    JSON.stringify(dataSet)
  );
  
  return {
    assets: [dataSet["@type"]],
    keywords: [dataSet["@id"]],
  };
}; 