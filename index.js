const publishToODN = require("./src/queries/queryOTNode");
const randomQuery = require("./src/util/queryTypes");
require("dotenv").config();

const publish = async () => {
  const query = randomQuery();
  console.log(`About to publish dataset taken from ${query.name}`);
  query
    .getData()
    .then(async ({ assets, keywords }) => {
      await publishToODN(assets, keywords, query.filepath);
      publish();
    })
    .catch((error) => console.log(`Error : ${error}`));
};
publish();
