const context = require("../../contexts/arcticInfrastructure.json")
const fetchData = require("../util/fetchData");
const { getArcticInfrastructure } = require("../util/apiOptions");

module.exports = getRandomArcticInfradata = async () => {
  let result;
  let tries = 0;
  while (!result) {
    if (tries >= 3) throw Error("max number of retries reached.");
    const pageIndex = Math.floor(Math.random() * 7);
    let apiOptions = getArcticInfrastructure().getRecord(pageIndex, 100);
    result = await fetchData(apiOptions);
    if (!result) {
      continue;
    }
    const infraIndex = Math.floor(
      Math.random() * result.data["hydra:member"].length
    );
    recordID = result.data["hydra:member"][infraIndex]["@id"];
    apiOptions = getArcticInfrastructure().getInfrastructure(recordID);
    result = await fetchData(apiOptions);
    tries++;
  }

  return {...result.data, "@context": context};
};
