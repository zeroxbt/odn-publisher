const DKGClient = require("dkg-client");

const OT_NODE_HOSTNAME = "0.0.0.0";
const OT_NODE_PORT = 8900;

let options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: false,
  maxNumberOfRetries: 60,
};
const dkg = new DKGClient(options);

module.exports = publish = async (assets, keywords, filepath) => {
  options = {
    filepath,
    assets,
    keywords,
    visibility: true,
  };
  await dkg
    .publish(options)
    .then((result) => {
      console.log(JSON.stringify(result));
    })
    .catch((error) => {
      console.log(`error publishing to the network. ${error}`);
    });
};
