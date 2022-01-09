const getRandomGoogle = require("./src/queryGoogleKG");
const publishToODN = require("./src/queryOTNode");
require("dotenv").config();

const publish = async () => {
  getRandomGoogle().then(async ({ assets, keywords }) => {
    await publishToODN(assets, keywords);
    publish();
  });
};
publish();
