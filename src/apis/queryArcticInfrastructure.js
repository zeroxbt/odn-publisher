const context = require("../../contexts/arcticInfrastructure.json")
const queryAPI = require("../util/queryAPI");
const { getArcticInfrastructure } = require("../util/queryOptions");

module.exports = getRandomArcticInfradata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const pageIndex = Math.floor(Math.random() * 7);
    let queryOptions = getArcticInfrastructure().getRecord(pageIndex, 100);
    result = await queryAPI(queryOptions);
    if (!result) {
      continue;
    }
    const infraIndex = Math.floor(
      Math.random() * result.data["hydra:member"].length
    );
    recordID = result.data["hydra:member"][infraIndex]["@id"];
    queryOptions = getArcticInfrastructure().getInfrastructure(recordID);
    result = await queryAPI(queryOptions);
    tries++;
  }

  return {...result.data, "@context": context};
};
