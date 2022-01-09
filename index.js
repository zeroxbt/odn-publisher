const getRandomGoogle = require("./src/queryGoogleKG");
const publishToODN = require("./src/queryOTNode");
require("dotenv").config();

const googleDataset = "google.json";
const publish = async () => {
  getRandomGoogle()
    .then(async ({ assets, keywords }) => {
      await publishToODN(assets, keywords, googleDataset);
      publish();
    })
    .catch((err) => console.log(`Error : ${error}`));
};
publish();
