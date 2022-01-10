const publishToODN = require("./src/queries/queryOTNode");
const randomQuery = require("./src/util/queryTypes");
require("dotenv").config();

const publish = async () => {
  console.log(`About to publish dataset taken from ${randomQuery.name}`);
  randomQuery.getData
    .then(async ({ assets, keywords }) => {
      await publishToODN(assets, keywords, randomQuery.filepath);
      publish();
    })
    .catch((error) => console.log(`Error : ${error}`));
};
publish();
