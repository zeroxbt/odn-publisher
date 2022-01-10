const publishToODN = require("./src/queries/queryOTNode");
const queryTypes = require("./src/util/queryTypes");
require("dotenv").config();

const publish = async () => {
  const queryListLen = await queryTypes.queryListLen();
  for(var queryIndex = 0; queryIndex <= queryListLen; queryIndex++){
    query = await queryTypes.query(queryIndex);
    console.log(`About to publish dataset taken from ${query.name}`);
    await query
      .getData()
      .then(async ({ assets, keywords }) => {
        await publishToODN(assets, keywords, query.filepath);
      })
      .catch((error) => console.log(`Error : ${error}`));

      if(queryIndex == queryListLen -1){
        queryIndex = -1;
      }
  }
};
publish();
