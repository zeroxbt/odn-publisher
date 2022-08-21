const DKGClient = require("dkg.js");

const dkg = new DKGClient({
  endpoint: process.env.USE_SSL ? "https://0.0.0.0" : "http://0.0.0.0",
  port: 8900,
  useSSL: !!process.env.USE_SSL,
});

const blockchain = {
  name: "otp",
  publicKey: process.env.WALLET_PUBLIC_KEY,
  privateKey: process.env.WALLET_PRIVATE_KEY,
};

module.exports.publish = async (content) => {
  try {
    const result = await dkg.asset.create(content, {
      visibility: "public",
      holdingTimeInYears: 1,
      tokenAmount: 1,
      blockchain,
    });

    return result;
  } catch (error) {
    console.log(`error publishing to the network. ${error}`);
  }
};

module.exports.get = async (ual) => {
  try {
    const result = await dkg.asset.get(ual, {
      validate: true,
      blockchain,
    });

    return result;
  } catch (error) {
    console.log(`error publishing to the network. ${error}`);
  }
};
