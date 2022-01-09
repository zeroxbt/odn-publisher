const getRandomGoogle = require("./src/queryGoogleKG");
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
      await sleepForMilliseconds(6 * 1000);
      publish();
    })
    .catch((err) => console.log(`Error : ${error}`));
};
publish();
