require("dotenv").config();
const { setTimeout } = require("timers/promises");
const { publish, get } = require("./src/apis/OTNode");
const apis = require("./src/util/apis");

const logPrettyJSON = (data) => console.log(JSON.stringify(data, null, 2));

(async () => {
  while (true) {
    for (const api of apis) {
      console.log(`About to publish dataset taken from ${api.name}`);

      // fetch data
      const data = await api.getData();

      // create asset
      const publishResult = await publish(data);
      logPrettyJSON(publishResult)

      // get asset
      if (publishResult?.UAL) {
        const getResult = await get(publishResult.UAL);
        logPrettyJSON(getResult)
      }

      // sleep 5 seconds
      await setTimeout(5 * 1000);
    }
  }
})();
