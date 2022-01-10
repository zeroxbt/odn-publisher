const getRandomGoogle = require("./src/bulkQueries/queryGoogleKG");
const publishToODN = require("./src/queryOTNode");
require("dotenv").config();

const sleepForMilliseconds = async (milliseconds) => {
  await new Promise((r) => setTimeout(r, milliseconds));
};

const googleDataset = "google.json";
const publish = async () => {
  getRandomGoogle()
    .then(async ({ assets, keywords }) => {
      await publishToODN(assets, keywords, googleDataset);
      publish();
    })
    .catch((error) => console.log(`Error : ${error}`));
};
publish();
