const publishToODN = require("./src/queries/queryOTNode");
const queryTypes = require("./src/util/queryTypes");
require("dotenv").config();

const publish = async () => {
  let queryIndex = 0;
  const queryListLen = queryTypes.queryListLen();
  while (true) {
    query = queryTypes.query(queryIndex);
    console.log(`About to publish dataset taken from ${query.name}`);
    await query
      .getData()
      .then(async ({ assets, keywords }) => {
        await publishToODN.publish(assets, keywords, query.filepath);

        if(process.env.ENABLE_SEARCH == 'Y'){
          console.log(`Search is enabled.`);
          await publishToODN.search(keywords);
        }
      })
      .catch((error) => console.log(`Error : ${error}`));

    queryIndex = (queryIndex + 1) % queryListLen;
  }
};
publish();
